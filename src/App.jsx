import { useEffect, useMemo, useState } from "react";
import { HashRouter, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

import { starter } from "./data/starter";
import { LS_KEY, minutesToHMS } from "./utils/format";
import ModuleBlock from "./components/ModuleBlock";
import Spinner from "./components/Spinner";
import ThemePicker from "./components/ThemePicker";
import { ThemeProvider } from "./theme/ThemeProvider";

import Overview from "./components/Overview";
import { overview } from "./data/overview";
import { loadPhase } from "./data/loadPhase";

/* ============ Utilities ============ */

function filterModules(modules, term) {
  const q = (term || "").trim().toLowerCase();
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

// group sections by day using flexible patterns
function groupByDay(sections = []) {
  const out = {};
  const normalize = (v) => (v && String(v)) || "";
  sections.forEach((s) => {
    const hay = `${normalize(s.title)} ${normalize(s.id)}`;
    let day = /day[\s\-]*(\d+)/i.exec(hay)?.[1]
           || /\bD(?:ay)?[\s\-]?(\d+)\b/i.exec(hay)?.[1]
           || null;
    if (!day) day = "general";
    const key = `day-${day}`;
    if (!out[key]) out[key] = { key, title: day === "general" ? "General" : `Day ${day}`, sections: [] };
    out[key].sections.push(s);
  });
  return out;
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

/* ============ Notes JSON DB (subjects) ============ */
/* Shape:
{
  subjects: {
    cyber: { items: { [itemId]: {done, notes} } },
    sweng: { ... },
  }
}
*/
const DB_KEY = "notes_db_v1";

function useJsonDB() {
  const [db, setDb] = useState(() => {
    try { return JSON.parse(localStorage.getItem(DB_KEY)) || { subjects: { cyber: { items: {} } } }; }
    catch { return { subjects: { cyber: { items: {} } } }; }
  });

  useEffect(() => { localStorage.setItem(DB_KEY, JSON.stringify(db)); }, [db]);

  function exportDb() {
    const blob = new Blob([JSON.stringify(db, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `notes-db-${new Date().toISOString().slice(0,10)}.json`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  function importDb(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const obj = JSON.parse(String(reader.result));
        if (obj?.subjects) setDb(obj);
      } catch { alert("Invalid DB JSON"); }
    };
    reader.readAsText(file);
  }

  return { db, setDb, exportDb, importDb };
}

/* ================= HUB (Home) ================= */
function Hub({ exportDb, importDb }) {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <header className="sticky top-0 z-10 backdrop-blur bg-base-100/90 border-b border-base-300">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="font-semibold tracking-tight">🏠 Notes Hub</div>
          <div className="ml-auto flex items-center gap-2">
            <ThemePicker />
            <label className="btn btn-sm">
              Import DB
              <input type="file" accept="application/json" className="hidden" onChange={(e)=>e.target.files[0]&&importDb(e.target.files[0])}/>
            </label>
            <button className="btn btn-sm" onClick={exportDb}>Export DB</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Your spaces</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/cyber" className="card bg-base-100 border border-base-300 hover:shadow transition">
            <div className="card-body">
              <div className="font-semibold text-lg">🛡️ Cybersecurity</div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Link to="/cyber/intro" className="btn btn-sm">Intro</Link>
                <Link to="/cyber/bootcamp" className="btn btn-sm btn-primary">Bootcamp</Link>
              </div>
            </div>
          </Link>

          <Link to="/sweng" className="card bg-base-100 border border-base-300 hover:shadow transition">
            <div className="card-body">
              <div className="font-semibold text-lg">💻 Software Engineering</div>
              <p className="text-sm opacity-70">Keep project + study notes here.</p>
            </div>
          </Link>

          <a href="https://your-portfolio.example" target="_blank" rel="noreferrer"
             className="card bg-base-100 border border-base-300 hover:shadow transition">
            <div className="card-body">
              <div className="font-semibold text-lg">🌐 Portfolio</div>
              <p className="text-sm opacity-70">Open your web portfolio (link).</p>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
}

/* ================= CYBER → BOOTCAMP ================= */

function BootcampHome({
  data, setData, store, setStore,
  phaseId, setPhaseId, q, setQ, view, setView,
}) {
  // lazy-load phase on open
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

  const current = useMemo(() => data.phases.find((p) => p.id === phaseId) || data.phases[0], [data, phaseId]);

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

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <header className="sticky top-0 z-10 backdrop-blur bg-base-100/90 border-b border-base-300">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="btn btn-sm">← Hub</Link>
          <div className="font-semibold tracking-tight">⚡ Cyber Bootcamp</div>
          <div className="ml-2 rounded-lg border border-base-300 overflow-hidden">
            <button onClick={() => setView("overview")} className={`px-3 py-1.5 text-sm ${view === "overview" ? "bg-base-200 font-medium" : ""}`}>Overview</button>
            <button onClick={() => setView("notes")} className={`px-3 py-1.5 text-sm ${view === "notes" ? "bg-base-200 font-medium" : ""}`}>Notes</button>
          </div>
          <div className="ml-auto"><ThemePicker /></div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-4">
        {view === "overview" ? (
          <Overview data={overview} activePhaseId={phaseId} onJumpToPhase={(pid) => { setPhaseId(pid); setView("notes"); }} />
        ) : (
          <>
            {/* Phase grid */}
            <section aria-label="Phases" className="mb-4">
              <h2 className="text-xs font-semibold text-base-content/70 mb-2">Phases</h2>
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
                    <button key={p.id} onClick={() => setPhaseId(p.id)}
                      className={`text-left rounded-xl border p-3 shadow-sm hover:shadow transition ${active ? "ring-2 ring-primary border-primary/30" : "border-base-300 bg-base-100"}`}>
                      <div className="text-sm font-semibold">{p.title}</div>
                      <div className="text-xs opacity-70">{p.subtitle || ""}</div>
                      <div className="mt-2 text-xs">{pct}% complete</div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Current phase header + module buttons */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h1 className="text-xl font-bold">{current.title}</h1>
                  <div className="text-sm opacity-70">{current.subtitle || ""}</div>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-base-200">{minutesToHMS(phaseProgress.time)}</span>
                  <span className="px-2 py-0.5 rounded-full bg-base-200">{Math.round(phaseProgress.pct)}%</span>
                </div>
              </div>

              {(current.modules || []).length > 0 ? (
                <>
                  <h3 className="text-xs font-semibold text-base-content/70 mb-2">Modules</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {filterModules(current.modules || [], "").map((mod) => {
                      const st = moduleStats(mod, store);
                      return (
                        <button key={mod.id}
                          onClick={() => navigate(`/cyber/bootcamp/phase/${current.id}/module/${mod.id}`)}
                          className="text-left rounded-xl border border-base-300 bg-base-100 p-3 shadow-sm hover:shadow transition">
                          <div className="text-sm font-semibold truncate">{mod.title}</div>
                          <div className="mt-1 text-xs opacity-70">{st.done}/{st.total} • {st.pct}%</div>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (<div className="text-sm opacity-70">No modules yet.</div>)}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

/* Module page */
function ModulePage({ data, setData, store, setStore }) {
  const { phaseId, moduleId } = useParams();
  const [loading, setLoading] = useState(false);

  const phase = useMemo(() => data.phases.find((p) => p.id === phaseId), [data.phases, phaseId]);

  useEffect(() => {
    if (!phase || (phase.modules && phase.modules.length > 0)) return;
    let cancelled = false;
    setLoading(true);
    loadPhase(phaseId).then((full) => {
      if (cancelled) return;
      setData((prev) => ({ ...prev, phases: prev.phases.map((x) => (x.id === phaseId ? full : x)) }));
    }).finally(() => setLoading(false));
    return () => { cancelled = true; };
  }, [phase, phaseId, setData]);

  const module = useMemo(() => (phase?.modules || []).find((m) => m.id === moduleId), [phase, moduleId]);

  const navigate = useNavigate();
  const days = useMemo(() => groupByDay(module?.sections || []), [module]);

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <header className="sticky top-0 z-10 bg-base-100/90 border-b border-base-300 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2">
          <Link to="/cyber/bootcamp" className="btn btn-sm">← Back</Link>
          <div className="ml-2 text-xs opacity-70">{phase?.title}</div>
          <div className="ml-auto"><ThemePicker /></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-4">
        {!phase || !module ? (
          <Spinner label="Loading module…" />
        ) : (
          <>
            <div className="mb-3">
              <h1 className="text-xl font-bold">{module.title}</h1>
            </div>

            {/* Day buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.values(days).map((d) => (
                <button
                  key={d.key}
                  onClick={() => navigate(`/cyber/bootcamp/phase/${phaseId}/module/${moduleId}/day/${d.key}`)}
                  className="btn btn-sm"
                  title={`Open ${d.title}`}
                >
                  {d.title}
                </button>
              ))}
            </div>

            <ModuleBlock module={module} store={store} setStore={setStore} loading={loading}/>
          </>
        )}
      </main>
    </div>
  );
}

/* Day page (no more blank — renders the actual items for that day) */
function DayPage({ data, setData, store, setStore }) {
  const { phaseId, moduleId, dayKey } = useParams();
  const [loading, setLoading] = useState(false);

  const phase = useMemo(() => data.phases.find((p) => p.id === phaseId), [data.phases, phaseId]);

  useEffect(() => {
    if (!phase || (phase.modules && phase.modules.length > 0)) return;
    let cancelled = false;
    setLoading(true);
    loadPhase(phaseId).then((full) => {
      if (cancelled) return;
      setData((prev) => ({ ...prev, phases: prev.phases.map((x) => (x.id === phaseId ? full : x)) }));
    }).finally(() => setLoading(false));
    return () => { cancelled = true; };
  }, [phase, phaseId, setData]);

  const module = useMemo(() => (phase?.modules || []).find((m) => m.id === moduleId), [phase, moduleId]);
  const days = useMemo(() => groupByDay(module?.sections || []), [module]);
  const day = days[dayKey];

  const [q, setQ] = useState("");

  const toggleDone = (id) => {
    setStore((s) => ({ ...s, items: { ...s.items, [id]: { ...s.items[id], done: !s.items[id]?.done } } }));
  };
  const saveNote = (id, txt) => {
    setStore((s) => ({ ...s, items: { ...s.items, [id]: { ...s.items[id], notes: txt } } }));
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <header className="sticky top-0 z-10 bg-base-100/90 border-b border-base-300 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2">
          <Link to={`/cyber/bootcamp/phase/${phaseId}/module/${moduleId}`} className="btn btn-sm">← Module</Link>
          <div className="ml-2 text-xs opacity-70">{phase?.title} • {module?.title}</div>
          <div className="ml-auto"><ThemePicker /></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-4">
        {loading || !day ? (
          <Spinner label="Loading day…" />
        ) : (
          <>
            <div className="mb-3">
              <h1 className="text-xl font-bold">{day.title}</h1>
              <div className="relative mt-2">
                <input
                  value={q}
                  onChange={(e)=>setQ(e.target.value)}
                  placeholder="Search in this day…"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {(day.sections || []).map((sec) => (
              <div key={sec.id} className="mb-3">
                <div className="font-semibold mb-1">{sec.title}</div>
                {(sec.items || [])
                  .filter(it => it.type !== "discussion")
                  .filter(it => !q || (it.title||"").toLowerCase().includes(q.toLowerCase()))
                  .map((it) => (
                    <div key={it.id} className="border-b border-base-300 py-2">
                      {/* Minimal inline item row to guarantee it works even if your ItemRow stayed custom */}
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={!!store.items[it.id]?.done}
                          onChange={() => toggleDone(it.id)}
                        />
                        <div className="flex-1">
                          <div className="text-sm">{it.title}</div>
                        </div>
                      </div>
                      <textarea
                        className="textarea textarea-bordered textarea-xs w-full mt-2"
                        placeholder="Notes…"
                        value={store.items[it.id]?.notes || ""}
                        onChange={(e)=>saveNote(it.id, e.target.value)}
                      />
                    </div>
                ))}
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
}

/* ======= App root with subjects & DB wiring ======= */
export default function App() {
  const { db, setDb, exportDb, importDb } = useJsonDB();

  // Bootcamp data / store pulled from DB.subjects.cyber
  const [data, setData] = useState(starter);
  const [phaseId, setPhaseId] = useState(starter.phases[0].id);
  const [q, setQ] = useState("");
  const [view, setView] = useState("overview"); // "overview" | "notes"

  // bind to DB (subject: cyber)
  const cyberStore = db.subjects.cyber || { items: {} };
  const setCyberStore = (newStore) => setDb((prev) => ({ ...prev, subjects: { ...prev.subjects, cyber: newStore } }));

  // Load legacy state (optional)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved.data) setData(saved.data);
      if (saved.phaseId) setPhaseId(saved.phaseId);
      // notes now live in DB; we don’t copy `saved.store`
    } catch {}
  }, []);

  // Save phaseId so returning keeps position
  useEffect(() => { localStorage.setItem(LS_KEY, JSON.stringify({ data, phaseId })); }, [data, phaseId]);

  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Hub exportDb={exportDb} importDb={importDb} />} />

          {/* Cyber area */}
          <Route path="/cyber" element={<Hub exportDb={exportDb} importDb={importDb} />} />
          <Route path="/cyber/intro" element={
            <div className="min-h-screen bg-base-200">
              <header className="sticky top-0 z-10 bg-base-100/90 border-b border-base-300">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2">
                  <Link to="/" className="btn btn-sm">← Hub</Link>
                  <div className="font-semibold">Cybersecurity Intro</div>
                  <div className="ml-auto"><ThemePicker /></div>
                </div>
              </header>
              <main className="max-w-4xl mx-auto px-4 py-6">
                <p className="opacity-70">Put your intro notes space here.</p>
              </main>
            </div>
          } />

          <Route path="/cyber/bootcamp" element={
            <BootcampHome
              data={data} setData={setData}
              store={cyberStore} setStore={setCyberStore}
              phaseId={phaseId} setPhaseId={setPhaseId}
              q={q} setQ={setQ} view={view} setView={setView}
            />
          } />
          <Route path="/cyber/bootcamp/phase/:phaseId/module/:moduleId"
            element={<ModulePage data={data} setData={setData} store={cyberStore} setStore={setCyberStore} />} />
          <Route path="/cyber/bootcamp/phase/:phaseId/module/:moduleId/day/:dayKey"
            element={<DayPage data={data} setData={setData} store={cyberStore} setStore={setCyberStore} />} />

          {/* Software Eng placeholder */}
          <Route path="/sweng" element={
            <div className="min-h-screen bg-base-200">
              <header className="sticky top-0 z-10 bg-base-100/90 border-b border-base-300">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2">
                  <Link to="/" className="btn btn-sm">← Hub</Link>
                  <div className="font-semibold">Software Engineering</div>
                  <div className="ml-auto"><ThemePicker /></div>
                </div>
              </header>
              <main className="max-w-4xl mx-auto px-4 py-6">
                <p className="opacity-70">Create folders, projects, and notes for SWE here.</p>
              </main>
            </div>
          } />

          {/* Fallback */}
          <Route path="*" element={<Hub exportDb={exportDb} importDb={importDb} />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}
