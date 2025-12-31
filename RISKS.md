# Risks

- Supabase auth migration mismatch
  - Trigger: existing localStorage users migrate with usernames that do not match Supabase Auth emails.
  - Impact: users cannot log in or their notes are associated with the wrong profile.
  - Mitigation: in `app/migrate/page.jsx`, require a verified email and map username to the profile row; add a preview step before upload.
  - Quick rollback plan: revert auth changes in `app/login/page.jsx` and `app/page.jsx` with `git revert <auth-commit>` and keep localStorage flow temporarily.

- RLS policy misconfiguration
  - Trigger: policies for `notes`, `categories`, or `profiles` are too strict or missing.
  - Impact: API routes return 401/403 or data appears empty.
  - Mitigation: validate policies in Supabase SQL Editor and add tests via `curl http://localhost:3000/api/notes` using a logged-in session.
  - Quick rollback plan: temporarily disable RLS in Supabase for affected tables and re-enable after fixing policies.

- Markdown XSS via preview
  - Trigger: enabling raw HTML in markdown rendering without sanitization.
  - Impact: stored notes can execute scripts in the preview pane.
  - Mitigation: keep `react-markdown` in safe mode and add sanitization (e.g., rehype-sanitize) in `src/components/notes/MarkdownPreview.tsx`.
  - Quick rollback plan: disable HTML rendering in `src/components/notes/MarkdownPreview.tsx` and redeploy.

- Theme persistence regression
  - Trigger: theme is stored only in Supabase and not cached locally, or user_preferences writes fail.
  - Impact: theme flickers on load or resets between sessions/devices.
  - Mitigation: in `src/theme/ThemeProvider.tsx`, keep localStorage fallback and sync to `user_preferences` in `lib/supabase.ts`.
  - Quick rollback plan: revert theme sync code and use localStorage only (commit revert on `src/theme/ThemeProvider.tsx`).

- Route refactor breaks existing links
  - Trigger: deleting `/hub`, `/cyber`, `/phase`, `/software` without redirects.
  - Impact: bookmarked URLs 404 and onboarding flow is broken.
  - Mitigation: add temporary redirects or compatibility pages before deleting routes.
  - Quick rollback plan: restore routes by reverting cleanup commit (`git revert <cleanup-commit>`).

- Admin endpoints expose privileged data
  - Trigger: admin checks fail or the service role key is accidentally used client-side.
  - Impact: non-admin users can read/modify user data.
  - Mitigation: keep `SUPABASE_SERVICE_ROLE_KEY` server-only and enforce ADMIN_USERNAMES in `app/api/admin/users/route.ts`.
  - Quick rollback plan: disable `/app/api/admin/users/route.ts` by returning 403 for all requests and redeploy.
