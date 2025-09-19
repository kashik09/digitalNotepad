import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Overview from "../components/Overview.jsx";
import Spinner from "../components/Spinner.jsx";
import ProgressRing from "../components/ProgressRing.jsx";
import * as phaseLoader from "../data/loadPhase.js"; // tolerate default or named exports
import * as starterData from "../data/starter.js";    // tolerate default or named exports
import { LS_KEY } from "../utils/format.js";

const loadPhaseFn =
  phaseLoader.default ||
  phaseLoader.loadPhase ||
  phaseLoader.load ||
  phaseLoader.fetchPhase;

if (typeof loadPhaseFn !== "function") {
  console.error("[loadPhase] loader not found in src/data/loadPhase.js");
}

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
      if (typeof loadPhaseFn !== "function") return;
      const ph = await loadPhaseFn(currentPhaseId);
      if (mounted) setPhase(ph || null);
    })();
    return () => { mounted = false; };
  }, [currentPhaseId]);

  return (
    <div className="p-4 sm:p-6">
      {/* Tabs */}
      <div role="tablist" className="tabs tabs-boxed mb-4">
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
                className={`btn btn-sm ${currentPhaseId === p.id ? "btn-primary" : "btn-outline"}`}
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
