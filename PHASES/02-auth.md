# Phase 02 - Auth

## Scope
- Implement Supabase-backed auth routes for login and registration.
- Build auth UI components and a ProtectedRoute wrapper.
- Replace localStorage auth flow and update root redirects.

## File checklist (exact paths)
- `app/api/auth/login/route.ts`
- `app/api/auth/register/route.ts`
- `src/components/auth/ProtectedRoute.tsx`
- `src/components/auth/LoginForm.tsx`
- `src/components/auth/RegisterForm.tsx`
- `app/login/page.jsx`
- `app/page.jsx`
- `lib/supabase.ts`
- `lib/db-types.ts`

## Command checklist
- `mkdir -p app/api/auth/login app/api/auth/register src/components/auth`
- `touch app/api/auth/login/route.ts app/api/auth/register/route.ts`
- `touch src/components/auth/ProtectedRoute.tsx src/components/auth/LoginForm.tsx src/components/auth/RegisterForm.tsx`
- `rg -n "AUTH:" app/login/page.jsx app/page.jsx`
- `npm run dev`
- `curl -X POST http://localhost:3000/api/auth/register -H 'Content-Type: application/json' -d '{"email":"test@example.com","password":"test","username":"test"}'`
- `curl -X POST http://localhost:3000/api/auth/login -H 'Content-Type: application/json' -d '{"email":"test@example.com","password":"test"}'`

## Definition of Done
- Registration creates a Supabase Auth user and corresponding profile row.
- Login validates credentials and optional PIN.
- ProtectedRoute blocks unauthenticated access and redirects to `/login`.
- `app/login/page.jsx` no longer depends on localStorage auth keys.
- `app/page.jsx` routes authenticated users to `/notes`.

## Common failure modes
- Username/email mapping mismatches between profile and Supabase Auth.
- PIN hashing done in the client instead of server route.
- Supabase session not persisted (cookies missing or misconfigured).
- Login/logout flows leave stale localStorage keys behind.
