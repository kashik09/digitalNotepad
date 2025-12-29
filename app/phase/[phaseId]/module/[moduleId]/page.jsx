'use client';

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Spinner from "@/src/components/Spinner";
import ProgressRing from "@/src/components/ProgressRing";
import ModuleBlock from "@/src/components/ModuleBlock";
import { LS_KEY } from "@/src/utils/format.js";

function modulePercent(mod) {
  if (typeof window === 'undefined') return 0;
  const raw = localStorage.getItem(LS_KEY);
  let itemsStore = {};
  try { itemsStore = JSON.parse(raw || "{}")?.items || {}; } catch {}
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
  const router = useRouter();
  const params = useParams();
  const phaseId = params.phaseId;
  const moduleId = params.moduleId;

  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const mod = await import("@/src/data/loadPhase.js");
        const loadPhase = mod.default || mod.loadPhase || mod.load || mod.fetchPhase;
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
          <button className="btn btn-ghost btn-sm" onClick={() => router.push("/")}>← Back</button>
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
        <button className="btn btn-ghost btn-sm" onClick={() => router.back()}>← Back</button>
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
