# Phase 06 - Polish

## Scope
- Add global keyboard shortcuts and help modal.
- Add navbar and integrate global providers in `app/layout.jsx`.
- Build the localStorage migration wizard.

## File checklist (exact paths)
- `src/components/shared/KeyboardShortcuts.tsx`
- `src/components/shared/Navbar.tsx`
- `app/layout.jsx`
- `app/migrate/page.jsx`
- `src/components/shared/Toast.tsx`
- `src/components/shared/ErrorBoundary.tsx`
- `src/components/search/GlobalSearch.tsx`

## Command checklist
- `mkdir -p app/migrate`
- `touch src/components/shared/KeyboardShortcuts.tsx src/components/shared/Navbar.tsx`
- `touch app/migrate/page.jsx`
- `rg -n "ThemeProvider|ThemeSwitcher" app/layout.jsx`
- `npm run dev`

## Definition of Done
- Keyboard shortcuts work globally without breaking text inputs.
- Navbar renders on all pages with navigation and theme controls.
- `app/layout.jsx` mounts ToastProvider, ErrorBoundary, GlobalSearch, and KeyboardShortcuts.
- Migration page uploads localStorage data and provides a clear action.

## Common failure modes
- Key handlers block typing in editor or inputs.
- Global modals cannot be closed with ESC.
- Layout uses client-only components without `use client` boundary.
