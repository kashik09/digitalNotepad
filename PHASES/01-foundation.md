# Phase 01 - Foundation

## Scope
- Install required dependencies for Supabase auth, markdown, syntax highlighting, hashing, and dates.
- Create `.env.local` and apply Supabase schema + RLS policies.
- Add base `lib/` utilities and shared hooks/providers.
- Consolidate theme logic into TSX and shared utilities.

## File checklist (exact paths)
- `package.json`
- `package-lock.json`
- `.env.local`
- `/home/kashi-kweyu/.claude/plans/precious-snuggling-dijkstra.md` (read for SQL source)
- `lib/supabase.ts`
- `lib/theme-utils.ts`
- `lib/analytics.ts`
- `lib/db-types.ts`
- `src/theme/ThemeProvider.jsx` (rename to `src/theme/ThemeProvider.tsx`)
- `src/components/ThemeSwitcher.jsx` (rename to `src/components/ThemeSwitcher.tsx`)
- `hooks/useKeyboardShortcut.ts`
- `hooks/useDebounce.ts`
- `hooks/useNotes.ts`
- `src/components/shared/ErrorBoundary.tsx`
- `src/components/shared/Toast.tsx`

## Command checklist
- `npm install @supabase/supabase-js @supabase/auth-helpers-nextjs react-markdown remark-gfm react-syntax-highlighter bcryptjs date-fns`
- `npm install --save-dev @types/react-syntax-highlighter @types/bcryptjs`
- `cat <<'ENV' > .env.local
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
ADMIN_USERNAMES=admin
PIN_SALT=random-secure-salt-string
ENV`
- `rg -n "CREATE TABLE|ALTER TABLE|CREATE POLICY" /home/kashi-kweyu/.claude/plans/precious-snuggling-dijkstra.md`
- `mkdir -p lib hooks src/components/shared`
- `touch lib/supabase.ts lib/theme-utils.ts lib/analytics.ts lib/db-types.ts`
- `touch hooks/useKeyboardShortcut.ts hooks/useDebounce.ts hooks/useNotes.ts`
- `touch src/components/shared/ErrorBoundary.tsx src/components/shared/Toast.tsx`
- `mv src/theme/ThemeProvider.jsx src/theme/ThemeProvider.tsx`
- `mv src/components/ThemeSwitcher.jsx src/components/ThemeSwitcher.tsx`
- `npm run lint`

## Definition of Done
- Supabase dependencies are installed and listed in `package.json`.
- `.env.local` is present with valid keys for Supabase and admin config.
- Supabase tables + RLS policies are created and verified in the dashboard.
- `lib/` modules compile and are importable in the app.
- Theme switching works without subject-specific logic and persists to Supabase.
- ErrorBoundary and ToastProvider render without runtime errors.

## Common failure modes
- Missing or incorrect Supabase env vars cause runtime auth failures.
- ThemeProvider and ThemeSwitcher still referencing old localStorage keys.
- TSX conversion errors after renaming `.jsx` to `.tsx`.
- RLS policies block writes from server actions or API routes.
