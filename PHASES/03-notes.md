# Phase 03 - Notes

## Scope
- Create notes and categories API routes with Supabase and RLS.
- Build notes UI components (list, editor, preview, category manager).
- Add notes pages and protected layout.

## File checklist (exact paths)
- `app/api/notes/route.ts`
- `app/api/notes/[id]/route.ts`
- `app/api/categories/route.ts`
- `app/api/categories/[id]/route.ts`
- `src/components/notes/NotesList.tsx`
- `src/components/notes/NoteCard.tsx`
- `src/components/notes/CategoryManager.tsx`
- `src/components/notes/NoteEditor.tsx`
- `src/components/notes/MarkdownPreview.tsx`
- `app/notes/layout.jsx`
- `app/notes/page.jsx`
- `app/notes/[noteId]/page.jsx`
- `hooks/useNotes.ts`
- `hooks/useDebounce.ts`

## Command checklist
- `mkdir -p app/api/notes/[id] app/api/categories/[id] app/notes/[noteId] src/components/notes`
- `touch app/api/notes/route.ts app/api/notes/[id]/route.ts`
- `touch app/api/categories/route.ts app/api/categories/[id]/route.ts`
- `touch src/components/notes/NotesList.tsx src/components/notes/NoteCard.tsx`
- `touch src/components/notes/CategoryManager.tsx src/components/notes/NoteEditor.tsx`
- `touch src/components/notes/MarkdownPreview.tsx`
- `touch app/notes/layout.jsx app/notes/page.jsx app/notes/[noteId]/page.jsx`
- `curl -X GET http://localhost:3000/api/notes`
- `curl -X POST http://localhost:3000/api/notes -H 'Content-Type: application/json' -d '{"title":"Test","content":"Hello"}'`

## Definition of Done
- Notes and categories CRUD works through API routes.
- `/notes` renders a split layout with sidebar and editor.
- Markdown preview renders with GFM and syntax highlighting.
- Auto-save triggers via debounce and indicates saving state.

## Common failure modes
- RLS prevents reads/writes due to missing policy on notes/categories.
- Note editor auto-save loops because state updates re-trigger saves.
- Markdown preview fails due to missing remark/rehype config.
- Note selection state not synced between list and editor.
