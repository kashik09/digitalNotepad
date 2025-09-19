import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Overview from "../components/Overview.jsx";
import Spinner from "../components/Spinner.jsx";
import ProgressRing from "../components/ProgressRing.jsx";
import * as starterData from "../data/starter.js"; // tolerate default or named exports
import { LS_KEY } from "../utils/format.js";

function resolveStarter(data) {
  const d = data?.default;
  if (d && d.phases) return d;
  if (data?.starter && data.starter.phases) return data.starter;
  if (Array.isArray(data?.phases)) return { phases: data.phases };
  return { phases: [] };
}
const STARTER = resolveStarter(starterData);

function moduleProgress(mod) {
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
  const pct = total ? Math.round((done / total) * 100) : 0;
  return { total, done, pct };
}

export default function HomeHub() {
  const [view, setView] = useState("overview"); // "overview" | "notes"
  const [currentPhaseId, setCurrentPhaseId] = useState(STARTER?.phases?.[0]?.id || "phase1");
  const [phase, setPhase] = useState(null);
  const phases = useMemo(() => STARTER?.phases || [], []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const mod = await import("../data/loadPhase.js");
        const loadPhase =
          mod.default || mod.loadPhase || mod.load || mod.fetchPhase;
        if (typeof loadPhase !== "function") {
          console.error("[loadPhase] no function export in src/data/loadPhase.js");
          return;
        }
        const ph = await loadPhase(currentPhaseId);
        if (mounted) setPhase(ph || null);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => { mounted = false; };
  }, [currentPhaseId]);

  return (
    <div className="p-4 sm:p-6">
      {/* Tabs */}
      <div role="tablist" className="tabs tabs-boxed tabs-sm mb-4">
        <button role="tab" className={`tab ${view === "overview" ? "tab-active" : ""}`} onClick={() => setView("overview")}>Overview</button>
        <button role="tab" className={`tab ${view === "notes" ? "tab-active" : ""}`} onClick={() => setView("notes")}>Notes</button>
      </div>

      {view === "overview" ? (
        <Overview />
      ) : (
        <div className="space-y-6">
          {/* Phase selector (no search here) */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {phases.map((p) => (
              <button
                key={p.id}
                className={`btn btn-xs ${currentPhaseId === p.id ? "btn-primary" : "btn-outline"}`}
                onClick={() => setCurrentPhaseId(p.id)}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Modules grid for the selected phase */}
          {!phase ? (
            <Spinner label="Loading phase…" />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(phase.modules || []).map((m) => {
                const { pct } = moduleProgress(m);
                return (
                  <Link
                    key={m.id}
                    to={`/phase/${currentPhaseId}/module/${m.id}`}
                    className="card bg-base-200 hover:bg-base-300 border border-base-300/60 transition-colors"
                  >
                    <div className="card-body">
                      <div className="flex items-center justify-between">
                        <h3 className="card-title">{m.title}</h3>
                        <ProgressRing value={pct} size="sm" />
                      </div>
                      <p className="text-base-content/70">Open module</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
