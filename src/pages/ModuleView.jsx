import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import ProgressRing from "../components/ProgressRing.jsx";
import ModuleBlock from "../components/ModuleBlock.jsx";
import loadPhase from "../data/loadPhase.js";
import { LS_KEY } from "../utils/format.js";

function modulePercent(mod) {
  // compute % done from localStorage items, ignoring 'discussion'
  const raw = localStorage.getItem(LS_KEY);
  let itemsStore = {};
  try {
    itemsStore = JSON.parse(raw || "{}")?.items || {};
  } catch {}
  let total = 0;
  let done = 0;
  for (const sec of mod?.sections || []) {
    for (const it of sec?.items || []) {
      if (!it || it.type === "discussion") continue;
      total += 1;
      if (itemsStore[it.id]?.done) done += 1;
    }
  }
  return total ? Math.round((done / total) * 100) : 0;
}

export default function ModuleView() {
  const nav = useNavigate();
  const { phaseId, moduleId } = useParams();
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const ph = await loadPhase(phaseId);
        if (mounted) setPhase(ph || null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [phaseId]);

  const mod = useMemo(() => {
    if (!phase || !Array.isArray(phase.modules)) return null;
    return phase.modules.find(m => String(m.id) === String(moduleId)) || null;
  }, [phase, moduleId]);

  if (loading) return <Spinner screen label="Loading module…" />;

  if (!phase || !mod) {
    return (
      <div className="p-6">
        <div className="mb-3">
          <button className="btn btn-ghost btn-sm" onClick={() => nav("#/") || nav("/")}>← Back</button>
        </div>
        <div className="alert alert-warning">
          <span>Module not found. Check the phase and module IDs.</span>
        </div>
      </div>
    );
  }

  const pct = modulePercent(mod);

  return (
    <div className="pb-8">
      {/* Back toolbar on its own line */}
      <div className="px-4 pt-4">
        <button className="btn btn-ghost btn-sm" onClick={() => nav(-1)}>← Back</button>
      </div>

      {/* Module header (separate from Back) */}
      <header className="px-4 pt-2 pb-4">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-xl font-semibold text-base-content">
            {phase.title} · {mod.title}
          </h1>
          <ProgressRing value={pct} size="sm" />
        </div>
      </header>

      {/* The actual module content */}
      <div className="px-4">
        <ModuleBlock module={mod} />
      </div>
    </div>
  );
}
