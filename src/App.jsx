// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import { HashRouter, Routes, Route, useNavigate, useParams, Link } from "react-router-dom";

import { starter } from "./data/starter";
import { LS_KEY, minutesToHMS } from "./utils/format";
import { ModuleBlock } from "./components/ModuleBlock";
import { Icon } from "./components/Icon";
import Spinner from "./components/Spinner";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { loadPhase } from "./data/loadPhase";

// Overview screen
import Overview from "./components/Overview";
import { overview } from "./data/overview";

// Pages
import DayPage from "./pages/DayPage";
import HomeHub from "./pages/HomeHub";

function filterModules(modules, term) {
  const q = term.trim().toLowerCase();
  if (!q) return modules || [];
  return (modules || [])
    .map((m) => ({
      ...m,
      sections: (m.sections || [])
        .map((s) => ({ ...s, items: (s.items || []).filter((it) => (it.title || "").toLowerCase().includes(q)) }))
        .filter((s) => (s.items || []).length > 0),
    }))
    .filter((m) => (m.sections || []).length > 0);
}

function moduleStats(module, store) {
  let total = 0, done = 0;
  (module.sections || []).forEach((s) =>
    (s.items || []).forEach((it) => {
      if (it.type === "discussion") return;
      total++;
      if (store.items[it.id]?.done) done++;
    })
  );
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}

function dayKeyFromSectionId(id = "") {
  const parts = id.split("-");
  const dIndex = parts.findIndex((p) => /^d\d+$/i.test(p));
  if (dIndex > 0) return parts.slice(0, dIndex + 1).join("-");
  return null;
}

function daysFromModule(module) {
  const set = new Set();
  (module.sections || []).forEach((s) => {
    const key = dayKeyFromSectionId(s.id);
    if (key) set.add(key);
  });
  return Array.from(set);
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
  // lazy-load phase
  useEffect(() => {
    const p = data.phases.find((x) => x.id === phaseId);
    if (!p || (p.modules && p.modules.length > 0)) return;
    let cancelled = false;
    loadPhase(phaseId)
      .then((full) => {
        if (cancelled) return;
        setData((prev) => ({ ...prev, phases: prev.phases.map((x) => (x.id === phaseId ? full : x)) }));
      })
      .catch((e) => console.error("Failed to load phase", phaseId, e));
    return () => { cancelled = true; };
  }, [phaseId, data.phases, setData]);

  const current = useMemo(
    () => data.phases.find((p) => p.id === phaseId) || data.phases[0],
    [data, phaseId]
  );

  const phaseProgress = useMemo(() => {
    let total = 0, done = 0, time = 0;
    (current.modules || []).forEach((m) =>
      (m.sections || []).forEach((s) =>
        (s.items || []).forEach((it) => {
          if (it.type === "discussion") return;
          total++;
          if (store.items[it.id]?.done) done++;
          if (it.meta?.timeMin) time += it.meta.timeMin;
        })
      )
    );
    return { total, done, pct: total ? (done / total) * 100 : 0, time };
  }, [current, store]);

  const visibleModules = useMemo(
    () => filterModules(current.modules || [], q),
    [current, q]
  );

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-base-100/80 border-b border-base-300">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/hub" className="font-semibold tracking-tight hover:opacity-80">⚡ Cyber Phases Notes</Link>

          <div className="ml-4 flex rounded-lg overflow-hidden border border-base-300">
            <button
              onClick={() => setView("overview")}
              className={`px-3 py-1.5 text-sm ${view === "overview" ? "bg-base-200 font-medium" : "bg-base-100"}`}
            >
              Overview
            </button>
            <button
              onClick={() => setView("notes")}
              className={`px-3 py-1.5 text-sm ${view === "notes" ? "bg-base-200 font-medium" : "bg-base-100"}`}
            >
              Notes
            </button>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {view === "notes" && (
              <div className="relative">
                <Icon name="search" className="w-4 h-4 absolute left-2 top-2.5 opacity-50" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Smart Search (title)…"
                  className="pl-7 pr-3 py-2 rounded-lg input input-bordered bg-base-100 w-56 text-sm"
                />
              </div>
            )}
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-6xl mx-auto px-4 py-4">
        {view === "overview" ? (
          <Overview
            data={overview}
            activePhaseId={phaseId}
            onJumpToPhase={(pid) => { setPhaseId(pid); setView("notes"); }}
          />
        ) : (
          <>
            {/* Phases row */}
            <section aria-label="Phases" className="mb-4">
              <h2 className="text-xs font-semibold opacity-70 mb-2">Phases</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {data.phases.map((p) => {
                  let total = 0, done = 0;
                  (p.modules || []).forEach((m) =>
                    (m.sections || []).forEach((s) =>
                      (s.items || []).forEach((it) => {
                        if (it.type === "discussion") return;
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
                        "text-left rounded-xl border bg-base-100 p-3 shadow-sm hover:shadow transition",
                        active ? "ring-2 ring-primary/50 border-primary/30" : "border-base-300"
                      ].join(" ")}
                    >
                      <div className="text-sm font-semibold line-clamp-2">{p.title}</div>
                      <div className="text-xs opacity-70">{p.subtitle || ""}</div>
                      <div className="mt-2 text-xs">{pct}% complete</div>
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
                  <div className="text-sm opacity-70">{current.subtitle || ""}</div>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="badge">{minutesToHMS(phaseProgress.time)}</span>
                  <span className="badge badge-outline">
                    {phaseProgress.done}/{phaseProgress.total} • {Math.round(phaseProgress.pct)}%
                  </span>
                </div>
              </div>

              {/* Modules grid + day buttons */}
              {(current.modules || []).length > 0 ? (
                <>
                  <h3 className="text-xs font-semibold opacity-70 mb-2">Modules</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {filterModules(current.modules || [], q).map((mod) => {
                      const st = moduleStats(mod, store);
                      const dayKeys = daysFromModule(mod);
                      return (
                        <div key={`btn-${mod.id}`} className="rounded-xl border border-base-300 bg-base-100 p-3 shadow-sm">
                          <button
                            onClick={() => navigate(`/phase/${current.id}/module/${mod.id}`)}
                            className="text-left w-full"
                            title={`Open ${mod.title}`}
                          >
                            <div className="text-sm font-semibold truncate">{mod.title}</div>
                            <div className="mt-1 text-xs opacity-70">
                              {st.done}/{st.total} • {st.pct}%
                            </div>
                          </button>

                          {dayKeys.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {dayKeys.map((dk) => {
                                const dayMatch = dk.match(/d(\d+)/i);
                                const label = dayMatch ? `Day ${dayMatch[1]}` : dk.replace(/-/g, " ");
                                return (
                                  <button
                                    key={dk}
                                    className="btn btn-xs"
                                    onClick={() => navigate(`/phase/${current.id}/module/${mod.id}/day/${dk}`)}
                                  >
                                    {label}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="text-sm opacity-70">No modules yet. Add later.</div>
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

  useEffect(() => {
    if (!phase || (phase.modules && phase.modules.length > 0)) return;
    let cancelled = false;
    loadPhase(phaseId)
      .then((full) => {
        if (!cancelled) {
          setData((prev) => ({ ...prev, phases: prev.phases.map((x) => (x.id === phaseId ? full : x)) }));
        }
      })
      .catch((e) => console.error("Failed to load phase", phaseId, e));
    return () => { cancelled = true; };
  }, [phase, phaseId, setData]);

  const module = useMemo(() => (phase?.modules || []).find((m) => m.id === moduleId), [phase, moduleId]);

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <header className="sticky top-0 z-10 backdrop-blur bg-base-100/80 border-b border-base-300">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/hub" className="font-semibold tracking-tight hover:opacity-80">⚡ Cyber Phases Notes</Link>
          <div className="ml-auto">
            <Link to="/" className="btn btn-sm">← Back</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-4">
        {!phase || !module ? (
          <Spinner label="Loading module…" />
        ) : (
          <>
            <div className="mb-4">
              <div className="text-xs opacity-70">{phase.title}</div>
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
  const [view, setView] = useState("overview");

  // load saved
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

  // persist
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
        <Route path="/hub" element={<HomeHub />} />
        <Route path="/phase/:phaseId/module/:moduleId" element={<ModulePage data={data} setData={setData} store={store} setStore={setStore} />} />
        <Route path="/phase/:phaseId/module/:moduleId/day/:dayKey" element={<DayPage data={data} setData={setData} store={store} setStore={setStore} />} />
        <Route path="*" element={<HomeHub />} />
      </Routes>
    </HashRouter>
  );
}
