# Phase 04 - Search and Analytics

## Scope
- Implement note search API and global search UI.
- Add analytics tracking endpoints and event instrumentation.

## File checklist (exact paths)
- `app/api/notes/search/route.ts`
- `src/components/search/GlobalSearch.tsx`
- `src/components/search/SearchResults.tsx`
- `app/api/analytics/track/route.ts`
- `app/api/analytics/stats/route.ts`
- `lib/analytics.ts`
- `src/components/notes/NoteEditor.tsx`
- `src/components/search/GlobalSearch.tsx`
- `app/api/auth/login/route.ts`
- `app/api/auth/register/route.ts`
- `app/api/notes/[id]/route.ts`

## Command checklist
- `mkdir -p app/api/notes/search app/api/analytics/track app/api/analytics/stats src/components/search`
- `touch app/api/notes/search/route.ts app/api/analytics/track/route.ts`
- `touch app/api/analytics/stats/route.ts`
- `touch src/components/search/GlobalSearch.tsx src/components/search/SearchResults.tsx`
- `curl "http://localhost:3000/api/notes/search?q=test"`
- `curl -X POST http://localhost:3000/api/analytics/track -H 'Content-Type: application/json' -d '{"event":"search","metadata":{"query":"test"}}'`

## Definition of Done
- Search modal opens via Cmd+K/Ctrl+K and shows result snippets.
- Search API logs queries to `search_history` and returns results scoped to user.
- Analytics tracking endpoint stores events and stats endpoint returns aggregates.

## Common failure modes
- Search query is too slow without indexes or proper filters.
- Analytics events are duplicated due to repeated renders.
- Search modal intercepts key events inside input fields.
