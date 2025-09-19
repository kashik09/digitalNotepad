import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import ProgressRing from "../components/ProgressRing.jsx";
import ModuleBlock from "../components/ModuleBlock.jsx";
import { LS_KEY } from "../utils/format.js";

function modulePercent(mod) {
  const raw = localStorage.getItem(LS_KEY);
  let itemsStore = {};
  try { itemsStore = JSON.parse(raw || "{}")?.items || {}; } catch {/* noop */}
  let total = 0, done = 0;
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
  const [q, setQ] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const mod = await import("../data/loadPhase.js");
        const loadPhase =
          mod.default || mod.loadPhase || mod.load || mod.fetchPhase;
        if (typeof loadPhase !== "function") {
          console.error("[loadPhase] no function export in src/data/loadPhase.js");
          return;
        }
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
      <div className="px-4 pt-4">
        <button className="btn btn-ghost btn-sm" onClick={() => nav(-1)}>← Back</button>
      </div>

      <header className="px-4 pt-2">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-xl font-semibold text-base-content">
            {phase.title} · {mod.title}
          </h1>
          <ProgressRing value={pct} size="sm" />
        </div>
      </header>

      <div className="px-4 pt-3 pb-2">
        <input
          className="input input-bordered w-full sm:max-w-lg"
          placeholder="Search in this module…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>

      <div className="px-4">
        <ModuleBlock module={mod} query={q} />
      </div>
    </div>
  );
}
