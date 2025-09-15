// Central loader so App can async-load a phase file.
// Using explicit mapping keeps Vite happy and creates separate chunks.

const loaders = {
  phase1: () => import("./phases/phase1.js"),
  phase2: () => import("./phases/phase2.js"),
  phase3: () => import("./phases/phase3.js"),
  phase4: () => import("./phases/phase4.js"),
  phase5: () => import("./phases/phase5.js"),
};

export async function loadPhase(phaseId) {
  const fn = loaders[phaseId];
  if (!fn) throw new Error(`Unknown phase: ${phaseId}`);
  const mod = await fn();
  return mod.default;
}

// Just the lightweight meta list used for initial render
export const phaseMeta = [
  { id: "phase1", title: "Phase 1", subtitle: "Foundations • SYS100 · NET100 · PYT100 · CRY100 · GRC100", modules: [] },
  { id: "phase2", title: "Phase 2", subtitle: "Intermediate • SYS200 · NET200 · CRY200 · PYT200 · CTI100", modules: [] },
  { id: "phase3", title: "Phase 3", subtitle: "Skills Development • SYS300 · NET300 · SIE100 · CRY300 · CTI200", modules: [] },
  { id: "phase4", title: "Phase 4", subtitle: "Gray Hat Hacking • SYS400 · NET400 · APP100 · SIE200 · GRC200", modules: [] },
  { id: "phase5", title: "Phase 5", subtitle: "Application & Capstone • NET500 · SYS500 · APP200 · SIE300 · Capstone", modules: [] },
];
