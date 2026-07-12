'use client';

import { useEffect, useMemo, useState } from 'react';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const [form, setForm] = useState({ title: '', content: '', category_id: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '', category_id: '' });

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const [nRes, cRes] = await Promise.all([fetch('/api/notes'), fetch('/api/categories')]);
      const nData = await nRes.json();
      const cData = await cRes.json();
      if (!nRes.ok) throw new Error(nData.error || 'Failed to load notes');
      setNotes(nData.notes || []);
      setCategories(cData.categories || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return notes;
    const q = query.toLowerCase();
    return notes.filter(
      (n) => n.title.toLowerCase().includes(q) || (n.content || '').toLowerCase().includes(q),
    );
  }, [notes, query]);

  async function createNote(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title,
        content: form.content,
        category_id: form.category_id || null,
      }),
    });
    if (res.ok) {
      setForm({ title: '', content: '', category_id: '' });
      load();
    }
  }

  function startEdit(n) {
    setEditingId(n.id);
    setEditForm({ title: n.title, content: n.content || '', category_id: n.category_id || '' });
  }

  async function saveEdit(id) {
    const res = await fetch(`/api/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editForm.title,
        content: editForm.content,
        category_id: editForm.category_id || null,
      }),
    });
    if (res.ok) {
      setEditingId(null);
      load();
    }
  }

  async function toggleComplete(n) {
    await fetch(`/api/notes/${n.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_completed: !n.is_completed }),
    });
    load();
  }

  async function removeNote(id) {
    await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Cyber Notes</h1>
        <p className="text-base-content/60 text-sm">Stored in db.json — no cloud, no cost.</p>
      </header>

      <form onSubmit={createNote} className="card bg-base-200 mb-6 p-4 space-y-3">
        <input
          className="input input-bordered w-full"
          placeholder="Note title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Write something…"
          rows={3}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <div className="flex flex-wrap gap-2">
          <select
            className="select select-bordered"
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          >
            <option value="">No category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon ? `${c.icon} ` : ''}
                {c.name}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary" disabled={!form.title.trim()}>
            Add note
          </button>
        </div>
      </form>

      <input
        className="input input-bordered mb-4 w-full"
        placeholder="Search notes…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p className="text-base-content/60">Loading…</p>}
      {error && <div className="alert alert-error">{error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className="card bg-base-200 p-6 text-center text-base-content/60">
          No notes yet. Add your first one above.
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((n) => (
          <div key={n.id} className="card bg-base-200 p-4">
            {editingId === n.id ? (
              <div className="space-y-2">
                <input
                  className="input input-bordered w-full"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                />
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  value={editForm.content}
                  onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                />
                <select
                  className="select select-bordered"
                  value={editForm.category_id}
                  onChange={(e) => setEditForm({ ...editForm, category_id: e.target.value })}
                >
                  <option value="">No category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.icon ? `${c.icon} ` : ''}
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <button className="btn btn-primary btn-sm" onClick={() => saveEdit(n.id)}>
                    Save
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3">
                  <h3 className={`font-semibold ${n.is_completed ? 'line-through opacity-60' : ''}`}>
                    {n.title}
                  </h3>
                  {n.category && (
                    <span className="badge" style={n.category.color ? { borderColor: n.category.color, color: n.category.color } : undefined}>
                      {n.category.icon ? `${n.category.icon} ` : ''}
                      {n.category.name}
                    </span>
                  )}
                </div>
                {n.content && <p className="mt-1 whitespace-pre-wrap text-base-content/80">{n.content}</p>}
                <div className="mt-3 flex flex-wrap gap-2">
                  <button className="btn btn-ghost btn-xs" onClick={() => toggleComplete(n)}>
                    {n.is_completed ? 'Mark active' : 'Mark done'}
                  </button>
                  <button className="btn btn-ghost btn-xs" onClick={() => startEdit(n)}>
                    Edit
                  </button>
                  <button className="btn btn-ghost btn-xs text-error" onClick={() => removeNote(n.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
