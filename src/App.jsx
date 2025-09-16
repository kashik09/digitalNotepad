import { useEffect, useMemo, useState } from "react";
import { HashRouter, Routes, Route, useNavigate, useParams, Link } from "react-router-dom";

import { starter } from "./data/starter";
import { LS_KEY } from "./utils/format"; // removed minutesToHMS
import { ModuleBlock } from "./components/ModuleBlock";
import { Icon } from "./components/Icon";
import { loadPhase } from "./data/loadPhase";

// Overview screen
import Overview from "./components/Overview";
import { overview } from "./data/overview";

function filterModules(modules, term) {
  const q = term.trim().toLowerCase();
  if (!q) return modules || [];
  return (modules || [])
    .map((m) => ({
      ...m,
      sections: (m.sections || [])
        .map((s) => ({
          ...s,
          items: (s.items || []).filter((it) => (it.title || "").toLowerCase().includes(q)),
        }))
        .filter((s) => (s.items || []).length > 0),
    }))
    .filter((m) => (m.sections || []).length > 0);
}

// quick per-module progress
function moduleStats(module, store) {
  let total = 0, done = 0;
  (module.sections || []).forEach((s) =>
    (s.items || []).forEach((it) => {
      total++;
      if (store.items[it.id]?.done) done++;
    })
  );
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}

/* =============================== */
/* Home (Overview / Notes)         */
/* =============================== */
function HomeView({
  data, setData,
  store, setStore,
  phaseId, setPhaseId,
  q, setQ,
  view, setView,
}) {
  // 🚀 Lazy-load the selected phase file the first time it's opened
  useEffect(() => {
    const p = data.phases.find((x) => x.id === phaseId);
    if (!p || (p.modules && p.modules.length > 0)) return;
    let cancelled = false;
    loadPhase(phaseId)
      .then((full) => {
        if (cancelled) return;
        setData((prev) => ({
          ...prev,
          phases: prev.phases.map((x) => (x.id === phaseId ? full : x)),
        }));
      })
      .catch((e) => console.error("Failed to load phase", phaseId, e));
    return () => { cancelled = true; };
  }, [phaseId, data.phases, setData]);

  const current = useMemo(
    () => data.phases.find((p) => p.id === phaseId) || data.phases[0],
    [data, phaseId]
  );

  // % only for phase
  const phaseProgress = useMemo(() => {
    let total = 0, done = 0;
    (current.modules || []).forEach((m) =>
      (m.sections || []).forEach((s) =>
        (s.items || []).forEach((it) => {
          total++;
          if (store.items[it.id]?.done) done++;
        })
      )
    );
    return { total, done, pct: total ? (done / total) * 100 : 0 };
  }, [current, store]);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ===== Header with Overview/Notes switch ===== */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="font-semibold tracking-tight">⚡ Cyber Phases Notes</div>

          {/* Tabs */}
          <div className="ml-4 flex rounded-lg overflow-hidden border">
            <button
              onClick={() => setView("overview")}
              className={`px-3 py-1.5 text-sm ${view === "overview" ? "bg-gray-100 font-medium" : "bg-white"}`}
            >
              Overview
            </button>
            <button
              onClick={() => setView("notes")}
              className={`px-3 py-1.5 text-sm ${view === "notes" ? "bg-gray-100 font-medium" : "bg-white"}`}
            >
              Notes
            </button>
          </div>

          {/* Right side controls only on Notes view */}
          <div className="ml-auto flex items-center gap-2">
            {view === "notes" && (
              <>
                <div className="relative">
                  <Icon name="search" className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Smart Search (title)…"
                    className="pl-7 pr-3 py-2 rounded-lg border bg-white w-56 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <button onClick={() => {
                  const blob = new Blob([JSON.stringify({ data, store }, null, 2)], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url; a.download = `cyber-notes-${new Date().toISOString().slice(0,10)}.json`; a.click();
                  setTimeout(() => URL.revokeObjectURL(url), 1500);
                }} className="px-2.5 py-2 rounded-lg border text-sm hover:bg-gray-100 flex items-center gap-1">
                  Export
                </button>
                <label className="px-2.5 py-2 rounded-lg border text-sm hover:bg-gray-100 flex items-center gap-1 cursor-pointer">
                  Import
                  <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]; if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () => {
                        try {
                          const obj = JSON.parse(String(reader.result));
                          if (obj.data?.phases) setData(obj.data);
                          if (obj.store?.items) setStore(obj.store);
                        } catch { alert("Invalid JSON file"); }
                      };
                      reader.readAsText(file);
                    }}
                  />
                </label>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ===== Body: Overview or Notes ===== */}
      <main className="max-w-6xl mx-auto px-4 py-4">
        {view === "overview" ? (
          <Overview
            data={overview}
            activePhaseId={phaseId}
            onJumpToPhase={(pid) => { setPhaseId(pid); setView("notes"); }}
          />
        ) : (
          <>
            {/* Phase cards */}
            <section aria-label="Phases" className="mb-4">
              <h2 className="text-xs font-semibold text-gray-600 mb-2">Phases</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {data.phases.map((p) => {
                  let total = 0, done = 0;
                  (p.modules || []).forEach((m) =>
                    (m.sections || []).forEach((s) =>
                      (s.items || []).forEach((it) => {
                        total++;
                        if (store.items[it.id]?.done) done++;
                      })
                    )
                  );
                  const pct = total ? Math.round((done / total) * 100) : 0;
                  const active = p.id === phaseId;

                  return (
                    <button
                      key={p.id}
                      onClick={() => setPhaseId(p.id)}
                      className={[
                        "text-left rounded-xl border bg-white p-3 shadow-sm hover:shadow transition",
                        active ? "ring-2 ring-blue-400 border-blue-200" : "border-gray-200"
                      ].join(" ")}
                    >
                      <div className="text-sm font-semibold">{p.title}</div>
                      <div className="text-xs text-gray-500">{p.subtitle || ""}</div>
                      <div className="mt-2 text-xs text-gray-600">{pct}% complete</div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Current phase header */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h1 className="text-xl font-bold">{current.title}</h1>
                  <div className="text-sm text-gray-500">{current.subtitle || ""}</div>
                </div>
                <div className="flex gap-2 text-xs">
                  {/* % only */}
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                    {Math.round(phaseProgress.pct)}%
                  </span>
                </div>
              </div>

              {/* 🔘 Module buttons only (open to dedicated page) */}
              {(current.modules || []).length > 0 ? (
                <>
                  <h3 className="text-xs font-semibold text-gray-600 mb-2">Modules</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {filterModules(current.modules || [], q).map((mod) => {
                      const st = moduleStats(mod, store);
                      return (
                        <button
                          key={`btn-${mod.id}`}
                          onClick={() => {
                            setPhaseId(current.id);
                            navigate(`/phase/${current.id}/module/${mod.id}`);
                          }}
                          className="text-left rounded-xl border border-gray-200 bg-white p-3 shadow-sm hover:shadow transition"
                          title={`Open ${mod.title}`}
                        >
                          <div className="text-sm font-semibold truncate">{mod.title}</div>
                          <div className="mt-1 text-xs text-gray-600">{st.pct}%</div>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="text-sm text-gray-500">No modules yet. Add later.</div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

/* =============================== */
/* Module Page (dedicated route)   */
/* =============================== */
function ModulePage({ data, setData, store, setStore }) {
  const { phaseId, moduleId } = useParams();

  const phase = useMemo(
    () => data.phases.find((p) => p.id === phaseId),
    [data.phases, phaseId]
  );

  // Ensure the phase is loaded (lazy)
  useEffect(() => {
    if (!phase || (phase.modules && phase.modules.length > 0)) return;
    let cancelled = false;
    loadPhase(phaseId)
      .then((full) => {
        if (cancelled) return;
        setData((prev) => ({
          ...prev,
          phases: prev.phases.map((x) => (x.id === phaseId ? full : x)),
        }));
      })
      .catch((e) => console.error("Failed to load phase", phaseId, e));
    return () => { cancelled = true; };
  }, [phase, phaseId, setData]);

  const module = useMemo(() => {
    return (phase?.modules || []).find((m) => m.id === moduleId);
  }, [phase, moduleId]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="font-semibold tracking-tight">⚡ Cyber Phases Notes</div>
          <div className="ml-auto">
            <Link
              to="/"
              className="text-sm px-3 py-1.5 rounded-lg border hover:bg-gray-100"
              title="Back to Notes"
            >
              ← Back
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-4">
        {!phase || !module ? (
          <div className="text-sm text-gray-500">Loading module…</div>
        ) : (
          <>
            <div className="mb-4">
              <div className="text-xs text-gray-500">{phase.title}</div>
              <h1 className="text-xl font-bold">{module.title}</h1>
            </div>

            <ModuleBlock module={module} store={store} setStore={setStore} />
          </>
        )}
      </main>
    </div>
  );
}

/* =============================== */
/* App Shell with Router           */
/* =============================== */
export default function App() {
  const [data, setData] = useState(starter);
  const [store, setStore] = useState({ items: {} });
  const [phaseId, setPhaseId] = useState(starter.phases[0].id);
  const [q, setQ] = useState("");
  const [view, setView] = useState("overview"); // "overview" | "notes"

  // Load saved state
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved.data) setData(saved.data);
      if (saved.store) setStore(saved.store);
      if (saved.phaseId) setPhaseId(saved.phaseId);
    } catch {}
  }, []);

  // Persist state
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ data, store, phaseId }));
  }, [data, store, phaseId]);

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomeView
              data={data}
              setData={setData}
              store={store}
              setStore={setStore}
              phaseId={phaseId}
              setPhaseId={setPhaseId}
              q={q}
              setQ={setQ}
              view={view}
              setView={setView}
            />
          }
        />
        <Route
          path="/phase/:phaseId/module/:moduleId"
          element={<ModulePage data={data} setData={setData} store={store} setStore={setStore} />}
        />
        <Route
          path="*"
          element={
            <HomeView
              data={data}
              setData={setData}
              store={store}
              setStore={setStore}
              phaseId={phaseId}
              setPhaseId={setPhaseId}
              q={q}
              setQ={setQ}
              view={view}
              setView={setView}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
}
