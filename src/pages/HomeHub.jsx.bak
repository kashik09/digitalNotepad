import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Overview from "../components/Overview.jsx";
import loadPhase from "../data/loadPhase.js";
import starter from "../data/starter.js";

export default function HomeHub() {
  const [view, setView] = useState("overview"); // "overview" | "notes"
  const [currentPhaseId, setCurrentPhaseId] = useState(starter?.phases?.[0]?.id || "phase1");
  const [phase, setPhase] = useState(null);
  const phases = useMemo(() => starter?.phases || [], []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const ph = await loadPhase(currentPhaseId);
      if (mounted) setPhase(ph || null);
    })();
    return () => { mounted = false; };
  }, [currentPhaseId]);

  return (
    <div className="p-4 sm:p-6">
      {/* Tabs */}
      <div role="tablist" className="tabs tabs-boxed mb-4">
        <button
          role="tab"
          className={`tab ${view === "overview" ? "tab-active" : ""}`}
          onClick={() => setView("overview")}
        >
          Overview
        </button>
        <button
          role="tab"
          className={`tab ${view === "notes" ? "tab-active" : ""}`}
          onClick={() => setView("notes")}
        >
          Notes
        </button>
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
            <div className="text-base-content/70">Loading phase…</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(phase.modules || []).map((m) => (
                <Link
                  key={m.id}
                  to={`/phase/${currentPhaseId}/${m.id}`}
                  className="card bg-base-200 hover:bg-base-300 border border-base-300/60 transition-colors"
                >
                  <div className="card-body">
                    <h3 className="card-title">{m.title}</h3>
                    <p className="text-base-content/70">Open module</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
