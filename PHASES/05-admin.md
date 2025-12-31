# Phase 05 - Admin

## Scope
- Build admin-only API endpoints for user management.
- Create admin UI components and pages under `/admin`.

## File checklist (exact paths)
- `app/api/admin/users/route.ts`
- `src/components/admin/UserTable.tsx`
- `src/components/admin/UserActions.tsx`
- `src/components/admin/AnalyticsDashboard.tsx`
- `app/admin/layout.jsx`
- `app/admin/page.jsx`
- `app/admin/users/page.jsx`
- `lib/supabase.ts`
- `lib/db-types.ts`

## Command checklist
- `mkdir -p app/api/admin/users app/admin/users src/components/admin`
- `touch app/api/admin/users/route.ts`
- `touch app/admin/layout.jsx app/admin/page.jsx app/admin/users/page.jsx`
- `touch src/components/admin/UserTable.tsx src/components/admin/UserActions.tsx`
- `touch src/components/admin/AnalyticsDashboard.tsx`
- `npm run dev`

## Definition of Done
- Admin API returns 403 for non-admin users.
- `/admin` and `/admin/users` are guarded and render admin UI.
- User enable/disable and delete actions work end-to-end.

## Common failure modes
- ADMIN_USERNAMES parsing does not match stored username casing.
- RLS prevents admin list queries without service role usage.
- Admin pages fail in SSR due to client-only auth checks.
