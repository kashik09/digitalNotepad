# Backlog

## Phase 01 - Foundation
- [P0] Install core dependencies (Supabase, markdown, syntax highlight, bcrypt, date-fns)
  - Objective: add required runtime and dev packages for auth, markdown rendering, and PIN hashing.
  - Files to create/edit:
    - `package.json`
    - `package-lock.json`
  - Commands to run:
    - `npm install @supabase/supabase-js @supabase/auth-helpers-nextjs react-markdown remark-gfm react-syntax-highlighter bcryptjs date-fns`
    - `npm install --save-dev @types/react-syntax-highlighter @types/bcryptjs`
    - `npm list @supabase/supabase-js`
  - Acceptance criteria:
    - Dependencies appear in `package.json` and `package-lock.json`.
    - `npm list @supabase/supabase-js` returns a single resolved version.

- [P0] Create runtime env config and confirm Supabase keys
  - Objective: provide required Supabase credentials and app config.
  - Files to create/edit:
    - `.env.local`
  - Commands to run:
    - `cat <<'ENV' > .env.local
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
ADMIN_USERNAMES=admin
PIN_SALT=random-secure-salt-string
ENV`
  - Acceptance criteria:
    - `.env.local` exists with all required keys.
    - App boots without missing env warnings when running `npm run dev`.

- [P0] Apply Supabase schema and RLS policies
  - Objective: create tables, indexes, and RLS policies in Supabase.
  - Files to create/edit:
    - `/home/kashi-kweyu/.claude/plans/precious-snuggling-dijkstra.md` (read for SQL source)
  - Commands to run:
    - `rg -n "CREATE TABLE|ALTER TABLE|CREATE POLICY" /home/kashi-kweyu/.claude/plans/precious-snuggling-dijkstra.md`
  - Acceptance criteria:
    - Supabase tables exist: profiles, categories, notes, user_preferences, analytics_events, search_history.
    - RLS is enabled and policies are active for all tables.

- [P1] Create core lib utilities
  - Objective: centralize Supabase client, theme helpers, analytics helpers, and DB types.
  - Files to create/edit:
    - `lib/supabase.ts`
    - `lib/theme-utils.ts`
    - `lib/analytics.ts`
    - `lib/db-types.ts`
  - Commands to run:
    - `mkdir -p lib`
    - `touch lib/supabase.ts lib/theme-utils.ts lib/analytics.ts lib/db-types.ts`
  - Acceptance criteria:
    - All `lib/*` modules export the required helpers and types.
    - Modules import cleanly in dev build without TypeScript errors.

- [P1] Consolidate theme system into TSX with shared utilities
  - Objective: remove subject-specific theme logic and persist theme/mode per user.
  - Files to create/edit:
    - `src/theme/ThemeProvider.jsx` (rename to `src/theme/ThemeProvider.tsx`)
    - `src/components/ThemeSwitcher.jsx` (rename to `src/components/ThemeSwitcher.tsx`)
    - `lib/theme-utils.ts`
    - `lib/supabase.ts`
    - `lib/db-types.ts`
  - Commands to run:
    - `mv src/theme/ThemeProvider.jsx src/theme/ThemeProvider.tsx`
    - `mv src/components/ThemeSwitcher.jsx src/components/ThemeSwitcher.tsx`
    - `rg -n "ThemeProvider|ThemeSwitcher" app/layout.jsx`
  - Acceptance criteria:
    - Theme switching works for all themes without route-specific logic.
    - Theme and mode persist to Supabase user_preferences (with local fallback).

- [P1] Add shared hooks and error/notification UI
  - Objective: establish reusable hooks and base UI for errors and toasts.
  - Files to create/edit:
    - `hooks/useKeyboardShortcut.ts`
    - `hooks/useDebounce.ts`
    - `hooks/useNotes.ts`
    - `src/components/shared/ErrorBoundary.tsx`
    - `src/components/shared/Toast.tsx`
  - Commands to run:
    - `mkdir -p hooks src/components/shared`
    - `touch hooks/useKeyboardShortcut.ts hooks/useDebounce.ts hooks/useNotes.ts`
    - `touch src/components/shared/ErrorBoundary.tsx src/components/shared/Toast.tsx`
  - Acceptance criteria:
    - Hooks compile and are importable in client components.
    - ErrorBoundary renders fallback UI and ToastProvider renders toasts.

## Phase 02 - Auth
- [P0] Implement Supabase auth API routes (login/register + PIN)
  - Objective: create secure auth endpoints using Supabase Auth and PIN verification.
  - Files to create/edit:
    - `app/api/auth/login/route.ts`
    - `app/api/auth/register/route.ts`
    - `lib/supabase.ts`
    - `lib/db-types.ts`
  - Commands to run:
    - `mkdir -p app/api/auth/login app/api/auth/register`
    - `touch app/api/auth/login/route.ts app/api/auth/register/route.ts`
    - `curl -X POST http://localhost:3000/api/auth/register -H 'Content-Type: application/json' -d '{"email":"test@example.com","password":"test","username":"test"}'`
  - Acceptance criteria:
    - Register creates Supabase Auth user + profile row.
    - Login validates password and PIN when configured.
    - Errors return non-200 status with clear messages.

- [P0] Build auth UI components and route guard
  - Objective: provide login/register UI and route protection.
  - Files to create/edit:
    - `src/components/auth/ProtectedRoute.tsx`
    - `src/components/auth/LoginForm.tsx`
    - `src/components/auth/RegisterForm.tsx`
  - Commands to run:
    - `mkdir -p src/components/auth`
    - `touch src/components/auth/ProtectedRoute.tsx src/components/auth/LoginForm.tsx src/components/auth/RegisterForm.tsx`
  - Acceptance criteria:
    - Forms submit to API routes and handle errors.
    - ProtectedRoute redirects unauthenticated users to `/login`.

- [P1] Replace localStorage auth flows and redirect logic
  - Objective: retire localStorage auth and route users based on Supabase session.
  - Files to create/edit:
    - `app/login/page.jsx`
    - `app/page.jsx`
  - Commands to run:
    - `rg -n "AUTH:" app/login/page.jsx app/page.jsx`
  - Acceptance criteria:
    - No localStorage auth keys are used for access control.
    - Root route sends authenticated users to `/notes` and others to `/login`.

## Phase 03 - Notes
- [P0] Implement notes and categories API routes
  - Objective: provide CRUD APIs for notes and categories with RLS enforcement.
  - Files to create/edit:
    - `app/api/notes/route.ts`
    - `app/api/notes/[id]/route.ts`
    - `app/api/categories/route.ts`
    - `app/api/categories/[id]/route.ts`
  - Commands to run:
    - `mkdir -p app/api/notes/[id] app/api/categories/[id]`
    - `touch app/api/notes/route.ts app/api/notes/[id]/route.ts`
    - `touch app/api/categories/route.ts app/api/categories/[id]/route.ts`
    - `curl -X GET http://localhost:3000/api/notes`
  - Acceptance criteria:
    - GET/POST/PUT/DELETE endpoints return expected data.
    - Users can only access their own notes and categories.

- [P0] Build notes UI components (list, editor, preview, categories)
  - Objective: deliver the main note-taking UI.
  - Files to create/edit:
    - `src/components/notes/NotesList.tsx`
    - `src/components/notes/NoteCard.tsx`
    - `src/components/notes/CategoryManager.tsx`
    - `src/components/notes/NoteEditor.tsx`
    - `src/components/notes/MarkdownPreview.tsx`
  - Commands to run:
    - `mkdir -p src/components/notes`
    - `touch src/components/notes/NotesList.tsx src/components/notes/NoteCard.tsx`
    - `touch src/components/notes/CategoryManager.tsx src/components/notes/NoteEditor.tsx`
    - `touch src/components/notes/MarkdownPreview.tsx`
  - Acceptance criteria:
    - Sidebar shows categories and notes; editor supports split view.
    - Markdown preview renders with GFM and syntax highlighting.
    - Auto-save runs with debounce and shows a saving indicator.

- [P0] Create notes pages and protected layout
  - Objective: expose notes UI at `/notes` and `/notes/[noteId]`.
  - Files to create/edit:
    - `app/notes/layout.jsx`
    - `app/notes/page.jsx`
    - `app/notes/[noteId]/page.jsx`
  - Commands to run:
    - `mkdir -p app/notes/[noteId]`
    - `touch app/notes/layout.jsx app/notes/page.jsx app/notes/[noteId]/page.jsx`
  - Acceptance criteria:
    - `/notes` loads the list + editor layout.
    - `/notes/[noteId]` loads the selected note and back navigation.

- [P1] Wire notes data hook and state management
  - Objective: centralize note fetching, caching, and refresh logic.
  - Files to create/edit:
    - `hooks/useNotes.ts`
    - `src/components/notes/NotesList.tsx`
    - `src/components/notes/NoteEditor.tsx`
    - `app/notes/page.jsx`
  - Commands to run:
    - `rg -n "useNotes" hooks/useNotes.ts src/components/notes/NotesList.tsx`
  - Acceptance criteria:
    - Creating/updating notes refreshes the list without full reload.

## Phase 04 - Search and Analytics
- [P1] Add search API and global search UI
  - Objective: enable full-text search and UI modal with keyboard shortcut.
  - Files to create/edit:
    - `app/api/notes/search/route.ts`
    - `src/components/search/GlobalSearch.tsx`
    - `src/components/search/SearchResults.tsx`
  - Commands to run:
    - `mkdir -p app/api/notes/search src/components/search`
    - `touch app/api/notes/search/route.ts src/components/search/GlobalSearch.tsx`
    - `touch src/components/search/SearchResults.tsx`
    - `curl "http://localhost:3000/api/notes/search?q=test"`
  - Acceptance criteria:
    - Cmd+K or Ctrl+K opens search.
    - Search results include snippet and metadata.
    - Search queries log to `search_history`.

- [P1] Implement analytics endpoints and instrumentation
  - Objective: track events and expose per-user stats.
  - Files to create/edit:
    - `app/api/analytics/track/route.ts`
    - `app/api/analytics/stats/route.ts`
    - `lib/analytics.ts`
    - `src/components/notes/NoteEditor.tsx`
    - `src/components/search/GlobalSearch.tsx`
    - `app/api/auth/login/route.ts`
    - `app/api/auth/register/route.ts`
    - `app/api/notes/[id]/route.ts`
  - Commands to run:
    - `mkdir -p app/api/analytics/track app/api/analytics/stats`
    - `touch app/api/analytics/track/route.ts app/api/analytics/stats/route.ts`
    - `curl -X POST http://localhost:3000/api/analytics/track -H 'Content-Type: application/json' -d '{"event":"test"}'`
  - Acceptance criteria:
    - Events are stored in `analytics_events`.
    - `/api/analytics/stats` returns counts and activity timeline.

## Phase 05 - Admin
- [P1] Implement admin user management API
  - Objective: allow admins to list, disable, and delete users.
  - Files to create/edit:
    - `app/api/admin/users/route.ts`
    - `lib/supabase.ts`
    - `lib/db-types.ts`
  - Commands to run:
    - `mkdir -p app/api/admin/users`
    - `touch app/api/admin/users/route.ts`
  - Acceptance criteria:
    - Requests from non-admin users return 403.
    - Admin can list users and toggle `disabled_at`.

- [P1] Build admin UI components
  - Objective: provide user management and analytics views.
  - Files to create/edit:
    - `src/components/admin/UserTable.tsx`
    - `src/components/admin/UserActions.tsx`
    - `src/components/admin/AnalyticsDashboard.tsx`
  - Commands to run:
    - `mkdir -p src/components/admin`
    - `touch src/components/admin/UserTable.tsx src/components/admin/UserActions.tsx`
    - `touch src/components/admin/AnalyticsDashboard.tsx`
  - Acceptance criteria:
    - Admin UI renders a table of users with action buttons.
    - Analytics dashboard shows totals and timeline data.

- [P1] Create admin pages and guards
  - Objective: wire admin-only routes under `/admin`.
  - Files to create/edit:
    - `app/admin/layout.jsx`
    - `app/admin/page.jsx`
    - `app/admin/users/page.jsx`
  - Commands to run:
    - `mkdir -p app/admin/users`
    - `touch app/admin/layout.jsx app/admin/page.jsx app/admin/users/page.jsx`
  - Acceptance criteria:
    - Non-admin users are redirected to `/notes`.
    - Admin dashboard renders with user table and analytics.

## Phase 06 - Polish
- [P1] Add keyboard shortcuts and help modal
  - Objective: provide global shortcuts for search, new note, save, and help.
  - Files to create/edit:
    - `src/components/shared/KeyboardShortcuts.tsx`
    - `hooks/useKeyboardShortcut.ts`
  - Commands to run:
    - `touch src/components/shared/KeyboardShortcuts.tsx`
  - Acceptance criteria:
    - Cmd+K, Cmd+N, Cmd+S, Cmd+/ and ESC work as documented.

- [P1] Add navbar and global layout integration
  - Objective: provide navigation, theme controls, and global providers.
  - Files to create/edit:
    - `src/components/shared/Navbar.tsx`
    - `app/layout.jsx`
    - `src/components/shared/Toast.tsx`
    - `src/components/shared/ErrorBoundary.tsx`
    - `src/components/search/GlobalSearch.tsx`
  - Commands to run:
    - `touch src/components/shared/Navbar.tsx`
    - `rg -n "ThemeSwitcher" app/layout.jsx`
  - Acceptance criteria:
    - Navbar renders on all pages with Notes/Admin/Logout/ThemeSwitcher.
    - ToastProvider, ErrorBoundary, and GlobalSearch are mounted globally.

- [P1] Build localStorage migration tool
  - Objective: migrate existing localStorage data into Supabase.
  - Files to create/edit:
    - `app/migrate/page.jsx`
  - Commands to run:
    - `mkdir -p app/migrate`
    - `touch app/migrate/page.jsx`
  - Acceptance criteria:
    - Migration reads localStorage keys and uploads notes/categories.
    - Success state offers localStorage clear action.

## Phase 07 - Cleanup and Deploy
- [P1] Remove legacy routes after migration
  - Objective: retire curriculum routes and hub navigation.
  - Files to create/edit:
    - `app/cyber/page.jsx` (delete)
    - `app/phase/[phaseId]/module/[moduleId]/page.jsx` (delete)
    - `app/hub/page.jsx` (delete)
    - `app/software/page.jsx` (delete)
    - `app/software/notes/page.jsx` (delete)
    - `app/software/projects/page.jsx` (delete)
  - Commands to run:
    - `rm -rf app/cyber app/phase app/hub app/software`
  - Acceptance criteria:
    - Old routes no longer exist and no imports reference them.

- [P1] Remove legacy data and components
  - Objective: delete curriculum data files and unused components.
  - Files to create/edit:
    - `src/data/phases/phase1.js` (delete)
    - `src/data/phases/phase2.js` (delete)
    - `src/data/phases/phase3.js` (delete)
    - `src/data/phases/phase4.js` (delete)
    - `src/data/phases/phase5.js` (delete)
    - `src/data/overview.js` (delete)
    - `src/data/overview-software.js` (delete)
    - `src/data/starter.js` (delete)
    - `src/data/loadPhase.js` (delete)
    - `src/components/ModuleBlock.jsx` (delete)
    - `src/components/ItemRow.jsx` (delete)
    - `src/components/ItemRowCompact.jsx` (delete)
    - `src/components/Overview.jsx` (delete)
    - `src/components/OverviewSoftware.jsx` (delete)
    - `src/components/ProgressRing.jsx` (delete)
    - `src/components/DataMenu.jsx` (delete)
    - `src/components/SubjectSwitch.jsx` (delete)
    - `src/components/AppTile.jsx` (delete)
    - `src/data` (delete when empty)
  - Commands to run:
    - `rm -rf src/data`
    - `rm src/components/ModuleBlock.jsx src/components/ItemRow.jsx src/components/ItemRowCompact.jsx`
    - `rm src/components/Overview.jsx src/components/OverviewSoftware.jsx src/components/ProgressRing.jsx`
    - `rm src/components/DataMenu.jsx src/components/SubjectSwitch.jsx src/components/AppTile.jsx`
  - Acceptance criteria:
    - Build passes with no missing import errors.

- [P1] Update documentation
  - Objective: document setup, features, and usage.
  - Files to create/edit:
    - `README.md`
  - Commands to run:
    - `sed -n '1,120p' README.md`
  - Acceptance criteria:
    - README includes setup, env vars, Supabase schema steps, and user guide.

- [P2] Test and deploy
  - Objective: validate functionality and ship to Vercel.
  - Files to create/edit:
    - `vercel.json`
  - Commands to run:
    - `npm run lint`
    - `npm run build`
    - `npm run start`
    - `git status`
    - `git add -A`
    - `git commit -m "release: deploy"`
    - `git push origin main`
  - Acceptance criteria:
    - All critical flows pass manual testing.
    - Vercel deploy succeeds with correct env vars.
