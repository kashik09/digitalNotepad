/**
 * db.json data layer — replaces Supabase.
 *
 * Source of truth: a local db.json file on disk (fs). When GITHUB_TOKEN and
 * GITHUB_REPO are set, every write is also mirrored to GitHub via the Contents
 * API, so the same db.json syncs across devices ("GitHub as the database").
 *
 * Single-user by design: no accounts, no sessions. One local profile owns
 * everything. An optional PIN can gate the UI on the client.
 */

import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import type {
  Profile,
  Category,
  Note,
  UserPreferences,
  AnalyticsEvent,
  SearchHistory,
  NoteWithCategory,
} from './db-types';

export const DEFAULT_USER_ID = 'local-user';

export interface DBShape {
  profiles: Profile[];
  categories: Category[];
  notes: Note[];
  user_preferences: UserPreferences[];
  analytics_events: AnalyticsEvent[];
  search_history: SearchHistory[];
}

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), 'db.json');

const nowISO = () => new Date().toISOString();
const uid = () => randomUUID();

/** Deterministic starter dataset (matches the committed db.json). */
function seed(): DBShape {
  const now = nowISO();
  const categories: Category[] = [
    { id: 'cat-general', user_id: DEFAULT_USER_ID, name: 'General Notes', color: '#22d3ee', icon: '📝', position: 0, created_at: now, updated_at: now },
    { id: 'cat-work', user_id: DEFAULT_USER_ID, name: 'Work', color: '#a78bfa', icon: '💼', position: 1, created_at: now, updated_at: now },
    { id: 'cat-personal', user_id: DEFAULT_USER_ID, name: 'Personal', color: '#60a5fa', icon: '👤', position: 2, created_at: now, updated_at: now },
  ];
  const notes: Note[] = [
    {
      id: 'note-welcome',
      user_id: DEFAULT_USER_ID,
      category_id: 'cat-general',
      title: 'Welcome to Cyber Notes',
      content: 'This note lives in db.json — no cloud, no cost.\n\nEdit or delete me, then add your own. Set GITHUB_TOKEN + GITHUB_REPO to sync across devices.',
      is_completed: false,
      position: 0,
      created_at: now,
      updated_at: now,
    },
  ];
  const profiles: Profile[] = [
    { id: DEFAULT_USER_ID, username: 'me', is_admin: true, use_pin: false, pin_hash: null, created_at: now, updated_at: now, disabled_at: null },
  ];
  const user_preferences: UserPreferences[] = [
    { user_id: DEFAULT_USER_ID, theme_mode: 'dark', theme_name: 'cyber-neon', last_route: null, preferences: {}, updated_at: now },
  ];
  return { profiles, categories, notes, user_preferences, analytics_events: [], search_history: [] };
}

function ensureShape(d: Partial<DBShape>): DBShape {
  return {
    profiles: d.profiles ?? [],
    categories: d.categories ?? [],
    notes: d.notes ?? [],
    user_preferences: d.user_preferences ?? [],
    analytics_events: d.analytics_events ?? [],
    search_history: d.search_history ?? [],
  };
}

export async function readDB(): Promise<DBShape> {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf8');
    return ensureShape(JSON.parse(raw));
  } catch {
    const seeded = seed();
    await fs.writeFile(DB_PATH, JSON.stringify(seeded, null, 2), 'utf8');
    return seeded;
  }
}

export async function writeDB(data: DBShape): Promise<void> {
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(DB_PATH, json, 'utf8');
  // Best-effort mirror to GitHub; never block or fail the local write.
  void syncToGitHub(json).catch((e) => console.error('GitHub sync skipped:', (e as Error).message));
}

/** Optional: mirror db.json to a GitHub repo when a token is configured. */
async function syncToGitHub(content: string): Promise<void> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // "owner/name"
  if (!token || !repo) return;

  const filePath = process.env.GITHUB_DB_PATH || 'db.json';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const api = `https://api.github.com/repos/${repo}/contents/${filePath}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };

  let sha: string | undefined;
  const getRes = await fetch(`${api}?ref=${branch}`, { headers });
  if (getRes.ok) sha = (await getRes.json()).sha;

  const body = JSON.stringify({
    message: `chore: sync db.json (${nowISO()})`,
    content: Buffer.from(content, 'utf8').toString('base64'),
    branch,
    ...(sha ? { sha } : {}),
  });
  const putRes = await fetch(api, { method: 'PUT', headers, body });
  if (!putRes.ok) throw new Error(`${putRes.status} ${await putRes.text()}`);
}

/** Single-user shim: the local profile owns everything. */
export async function getCurrentUser(): Promise<{ id: string; username: string }> {
  const db = await readDB();
  const p = db.profiles[0];
  return { id: p?.id ?? DEFAULT_USER_ID, username: p?.username ?? 'me' };
}

/* ---------------- categories ---------------- */

export async function listCategories(userId: string): Promise<Category[]> {
  const db = await readDB();
  return db.categories
    .filter((c) => c.user_id === userId)
    .sort((a, b) => a.position - b.position || a.name.localeCompare(b.name));
}

export async function getCategory(id: string, userId: string): Promise<Category | null> {
  const db = await readDB();
  return db.categories.find((c) => c.id === id && c.user_id === userId) ?? null;
}

export async function createCategory(
  userId: string,
  input: { name: string; color?: string | null; icon?: string | null },
): Promise<Category | { error: string; status: number }> {
  const db = await readDB();
  const name = input.name.trim();
  if (db.categories.some((c) => c.user_id === userId && c.name === name)) {
    return { error: 'Category with this name already exists', status: 409 };
  }
  const now = nowISO();
  const cat: Category = {
    id: uid(),
    user_id: userId,
    name,
    color: input.color ?? null,
    icon: input.icon ?? null,
    position: db.categories.filter((c) => c.user_id === userId).length,
    created_at: now,
    updated_at: now,
  };
  db.categories.push(cat);
  await writeDB(db);
  return cat;
}

export async function updateCategory(id: string, userId: string, updates: Partial<Category>): Promise<Category | null> {
  const db = await readDB();
  const c = db.categories.find((x) => x.id === id && x.user_id === userId);
  if (!c) return null;
  Object.assign(c, updates, { id: c.id, user_id: c.user_id, updated_at: nowISO() });
  await writeDB(db);
  return c;
}

export async function deleteCategory(id: string, userId: string): Promise<boolean> {
  const db = await readDB();
  const before = db.categories.length;
  db.categories = db.categories.filter((c) => !(c.id === id && c.user_id === userId));
  db.notes.forEach((n) => { if (n.category_id === id) n.category_id = null; });
  await writeDB(db);
  return db.categories.length < before;
}

/* ---------------- notes ---------------- */

function withCategory(note: Note, cats: Category[]): NoteWithCategory {
  const c = cats.find((x) => x.id === note.category_id);
  return { ...note, category: c ? { name: c.name, color: c.color, icon: c.icon } : null };
}

export async function listNotes(userId: string): Promise<NoteWithCategory[]> {
  const db = await readDB();
  return db.notes
    .filter((n) => n.user_id === userId)
    .sort((a, b) => a.position - b.position || b.updated_at.localeCompare(a.updated_at))
    .map((n) => withCategory(n, db.categories));
}

export async function getNote(id: string, userId: string): Promise<NoteWithCategory | null> {
  const db = await readDB();
  const n = db.notes.find((x) => x.id === id && x.user_id === userId);
  return n ? withCategory(n, db.categories) : null;
}

export async function createNote(
  userId: string,
  input: { title: string; content?: string; category_id?: string | null; is_completed?: boolean },
): Promise<Note | { error: string; status: number }> {
  const db = await readDB();
  if (input.category_id) {
    const ok = db.categories.some((c) => c.id === input.category_id && c.user_id === userId);
    if (!ok) return { error: 'Invalid category', status: 400 };
  }
  const now = nowISO();
  const note: Note = {
    id: uid(),
    user_id: userId,
    category_id: input.category_id ?? null,
    title: input.title.trim(),
    content: input.content ?? '',
    is_completed: input.is_completed ?? false,
    position: 0,
    created_at: now,
    updated_at: now,
  };
  db.notes.unshift(note);
  await writeDB(db);
  return note;
}

export async function updateNote(id: string, userId: string, updates: Partial<Note>): Promise<Note | null> {
  const db = await readDB();
  const n = db.notes.find((x) => x.id === id && x.user_id === userId);
  if (!n) return null;
  Object.assign(n, updates, { id: n.id, user_id: n.user_id, updated_at: nowISO() });
  await writeDB(db);
  return n;
}

export async function deleteNote(id: string, userId: string): Promise<boolean> {
  const db = await readDB();
  const before = db.notes.length;
  db.notes = db.notes.filter((n) => !(n.id === id && n.user_id === userId));
  await writeDB(db);
  return db.notes.length < before;
}

/* ---------------- search ---------------- */

export interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  category: string;
  updated_at: string;
}

export async function searchNotes(userId: string, query: string): Promise<SearchResult[]> {
  const db = await readDB();
  const q = query.toLowerCase();
  const matches = db.notes
    .filter((n) => n.user_id === userId && (n.title.toLowerCase().includes(q) || (n.content || '').toLowerCase().includes(q)))
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
    .slice(0, 20);

  const results: SearchResult[] = matches.map((n) => ({
    id: n.id,
    title: n.title,
    snippet: makeSnippet(n.content, query),
    category: db.categories.find((c) => c.id === n.category_id)?.name || 'Uncategorized',
    updated_at: n.updated_at,
  }));

  db.search_history.push({ id: uid(), user_id: userId, query: query.trim(), results_count: results.length, created_at: nowISO() });
  await writeDB(db);
  return results;
}

function makeSnippet(content: string, query: string, maxLength = 150): string {
  if (!content) return '';
  const index = content.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return content.slice(0, maxLength) + (content.length > maxLength ? '...' : '');
  const start = Math.max(0, index - 50);
  const end = Math.min(content.length, index + query.length + 50);
  let snippet = content.slice(start, end);
  if (start > 0) snippet = '...' + snippet;
  if (end < content.length) snippet = snippet + '...';
  return snippet;
}

/* ---------------- analytics ---------------- */

export async function trackEvent(userId: string, event_type: string, metadata: Record<string, unknown> = {}): Promise<void> {
  const db = await readDB();
  db.analytics_events.push({ id: uid(), user_id: userId, event_type, metadata, created_at: nowISO() });
  await writeDB(db);
}

export async function getStats(userId: string): Promise<{ totalNotes: number; totalCategories: number; completed: number; events: number }> {
  const db = await readDB();
  return {
    totalNotes: db.notes.filter((n) => n.user_id === userId).length,
    totalCategories: db.categories.filter((c) => c.user_id === userId).length,
    completed: db.notes.filter((n) => n.user_id === userId && n.is_completed).length,
    events: db.analytics_events.filter((e) => e.user_id === userId).length,
  };
}
