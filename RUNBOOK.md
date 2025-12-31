# Runbook (8-day plan)

Workflow
- Single branch: `main` only.
- Small commits (1-3 files) after each checkpoint.
- Commit early; no amend unless necessary.

Day 1 - Foundation setup
- Tasks: install dependencies, create `.env.local`, apply Supabase schema, scaffold `lib/` utilities.
- Estimated checkpoints:
  - 60-90 min: dependencies installed and `.env.local` created.
  - 60-90 min: Supabase schema applied and verified.
- When to commit:
  - After deps + env: `chore: add supabase deps and env config`.
  - After schema + lib scaffolding: `chore: add supabase schema and lib scaffolds`.

Day 2 - Theme consolidation and shared providers
- Tasks: convert ThemeProvider/ThemeSwitcher to TSX, move logic into `lib/theme-utils.ts`, add ErrorBoundary + ToastProvider.
- Estimated checkpoints:
  - 90-120 min: theme utilities and TSX conversions compile.
  - 60 min: ErrorBoundary and ToastProvider render in dev.
- When to commit:
  - After theme consolidation: `refactor: consolidate theme system`.
  - After shared providers: `feat: add error boundary and toast`.

Day 3 - Auth APIs and UI
- Tasks: implement `/app/api/auth/*`, build LoginForm/RegisterForm/ProtectedRoute, refactor `app/login/page.jsx`.
- Estimated checkpoints:
  - 90-120 min: auth routes return expected responses.
  - 60-90 min: login/register UI flows work end-to-end.
- When to commit:
  - After API routes: `feat: add auth api routes`.
  - After UI + login page: `feat: wire supabase auth ui`.

Day 4 - Notes API and data hook
- Tasks: implement notes/categories API routes, finalize `hooks/useNotes.ts`.
- Estimated checkpoints:
  - 90-120 min: CRUD routes tested with curl.
  - 60 min: useNotes hook returns data and refetches.
- When to commit:
  - After API routes: `feat: add notes and categories api`.
  - After data hook: `feat: add notes data hook`.

Day 5 - Notes UI and pages
- Tasks: build NotesList, NoteEditor, MarkdownPreview, CategoryManager, add `/notes` pages.
- Estimated checkpoints:
  - 90-120 min: UI components render with mock data.
  - 60-90 min: `/notes` loads real data with selection.
- When to commit:
  - After components: `feat: add notes ui components`.
  - After pages: `feat: add notes pages`.

Day 6 - Search and analytics
- Tasks: implement search API + GlobalSearch UI; add analytics endpoints and instrumentation.
- Estimated checkpoints:
  - 60-90 min: search API returns results and logs history.
  - 60-90 min: analytics track/stats endpoints work and are called.
- When to commit:
  - After search: `feat: add global search`.
  - After analytics: `feat: add analytics tracking and stats`.

Day 7 - Admin and polish
- Tasks: build admin API/UI/pages; add Navbar, KeyboardShortcuts, and update `app/layout.jsx`.
- Estimated checkpoints:
  - 60-90 min: admin routes guarded and UI renders.
  - 60-90 min: navbar + shortcuts working globally.
- When to commit:
  - After admin: `feat: add admin dashboard`.
  - After polish: `feat: add navbar and keyboard shortcuts`.

Day 8 - Migration, cleanup, and deploy
- Tasks: build migration page, remove legacy routes/data, update README, run tests, deploy to Vercel.
- Estimated checkpoints:
  - 60-90 min: migration tool completes upload and clears localStorage.
  - 60-90 min: cleanup completed and build passes.
- When to commit:
  - After migration tool: `feat: add migration tool`.
  - After cleanup/docs: `chore: remove legacy curriculum and update docs`.
  - After deploy prep: `release: deploy`.
