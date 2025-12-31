# Phase 07 - Cleanup and Deploy

## Scope
- Remove legacy curriculum routes, data, and components after migration is verified.
- Update README and complete testing and deployment steps.

## File checklist (exact paths)
- `app/cyber/page.jsx` (delete)
- `app/phase/[phaseId]/module/[moduleId]/page.jsx` (delete)
- `app/hub/page.jsx` (delete)
- `app/software/page.jsx` (delete)
- `app/software/notes/page.jsx` (delete)
- `app/software/projects/page.jsx` (delete)
- `src/data/phases/phase1.js` (delete)
- `src/data/phases/phase2.js` (delete)
- `src/data/phases/phase3.js` (delete)
- `src/data/phases/phase4.js` (delete)
- `src/data/phases/phase5.js` (delete)
- `src/data/overview.js` (delete)
- `src/data/overview-software.js` (delete)
- `src/data/starter.js` (delete)
- `src/data/loadPhase.js` (delete)
- `src/data` (delete when empty)
- `src/components/ModuleBlock.jsx` (delete)
- `src/components/ItemRow.jsx` (delete)
- `src/components/ItemRowCompact.jsx` (delete)
- `src/components/Overview.jsx` (delete)
- `src/components/OverviewSoftware.jsx` (delete)
- `src/components/ProgressRing.jsx` (delete)
- `src/components/DataMenu.jsx` (delete)
- `src/components/SubjectSwitch.jsx` (delete)
- `src/components/AppTile.jsx` (delete)
- `README.md`
- `vercel.json`

## Command checklist
- `rm -rf app/cyber app/phase app/hub app/software`
- `rm -rf src/data`
- `rm src/components/ModuleBlock.jsx src/components/ItemRow.jsx src/components/ItemRowCompact.jsx`
- `rm src/components/Overview.jsx src/components/OverviewSoftware.jsx src/components/ProgressRing.jsx`
- `rm src/components/DataMenu.jsx src/components/SubjectSwitch.jsx src/components/AppTile.jsx`
- `npm run lint`
- `npm run build`
- `npm run start`
- `git status`
- `git add -A`
- `git commit -m "chore: cleanup legacy routes"`
- `git push origin main`

## Definition of Done
- Old curriculum routes and data are removed without breaking builds.
- README documents features, setup, env vars, and usage.
- Production build completes and deploys on Vercel.

## Common failure modes
- Deleting routes without removing imports causes build errors.
- README still references legacy routes or localStorage auth.
- Vercel deploy fails due to missing env vars or RLS issues.
