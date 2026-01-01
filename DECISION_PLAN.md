# Decision Plan

## Park as WIP
These should remain untracked for now due to uncertainty, incomplete wiring, or risk.

- `app/api/admin/users/route.ts` — experimental API route; not reviewed.
- `app/api/analytics/stats/route.ts` — experimental API route; not reviewed.
- `app/api/analytics/track/route.ts` — experimental API route; not reviewed.
- `app/api/auth/login/route.ts` — experimental API route; not reviewed.
- `app/api/auth/register/route.ts` — experimental API route; not reviewed.
- `app/api/categories/[id]/route.ts` — experimental API route; not reviewed.
- `app/api/categories/route.ts` — experimental API route; not reviewed.
- `app/api/notes/[id]/route.ts` — experimental API route; not reviewed.
- `app/api/notes/route.ts` — experimental API route; not reviewed.
- `app/api/notes/search/route.ts` — experimental API route; not reviewed.
- `hooks/useDebounce.ts` — utility hook; unknown wiring; treat as WIP.
- `hooks/useKeyboardShortcut.ts` — utility hook; unknown wiring; treat as WIP.
- `lib/analytics.ts` — helper module; unknown usage; treat as WIP.
- `lib/db-types.ts` — types module; unknown usage; treat as WIP.
- `lib/supabase.ts` — client helpers; unknown usage; treat as WIP.
- `lib/theme-utils.ts` — theme helpers; unknown usage; treat as WIP.
- `src/components/ThemeSwitcher.tsx` — UI component; unknown wiring; treat as WIP.
- `src/components/shared/ErrorBoundary.tsx` — UI component; unknown wiring; treat as WIP.
- `src/components/shared/Toast.tsx` — UI component; unknown wiring; treat as WIP.
- `src/theme/ThemeProvider.tsx` — provider component; unknown wiring; treat as WIP.

Reason: all are untracked app code with unknown readiness and integration status; shipping without review risks regressions.

## Eligible to Ship (If Any)
None. No untracked files are clearly safe to ship without code review or validation.

## Split Commit Plan
No commit plan yet. All untracked files are parked as WIP until reviewed.

## WIP Docs to Remain Untracked
These are working/analysis documents and should stay untracked in `_wip/docs/`:

- `_wip/docs/PENDING_CHANGES_REPORT.md` — working analysis snapshot; not final.
- `_wip/docs/IMPLEMENTATION_TODO.md` — large upstream plan; not for commit.
- `_wip/docs/PROGRESS.md` — local progress notes; not for commit.

Reason: these are internal planning artifacts and may change frequently or contain experimental content.
