import { useEffect, useMemo, useState } from "react";
import { HashRouter, Routes, Route, useNavigate, useParams, Link } from "react-router-dom";

import { starter } from "./data/starter";
import { LS_KEY } from "./utils/format";
import { ModuleBlock } from "./components/ModuleBlock";
import { Icon } from "./components/Icon";
import { loadPhase } from "./data/loadPhase";
import Spinner from "./components/Spinner";

// Overview screen
import Overview from "./components/Overview";
import { overview } from "./data/overview";

// ------------------------ helpers
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

// very forgiving “day” grouper. Matches “Day 1”, “DAY 2”, “SYS100 Day 1 — …”, etc.
function groupSectionsByDay(sections = []) {
  const days = [];
  const other = [];
  const dayRegex = /day\s*(\d+)/i;

  sections.forEach((s) => {
    const m = (s.title || "").match(dayRegex);
    if (m) {
      const idx = Number(m[1]);
      const key = `day-${idx}`;
      let bucket = days.find((d) => d.key === key);
      if (!bucket) {
        bucket = { key, index: idx, title: `Day ${idx}`, sections: [] };
        days.push(bucket);
      }
      bucket.sections.push(s);
    } else {
      other.push(s);
    }
  });

  days.sort((a, b) => a.index - b.index);
  if (other.length) days.push({ key: "general", index: 999, title: "General", sections: other });
  return days;
}

// ------------------------ theme
function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return { theme, setTheme };
}

// ===============================
// Home (Overview / Notes)
// ===============================
function HomeView({
  data, setData,
  store, setStore,
  phaseId, setPhaseId,
  q, setQ,
  view, setView,
  themeHook,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // lazy-load selected phase
  useEffect(() => {
    const p = data.phases.find((x) => x.id === phaseId);
    if (!p || (p.modules && p.modules.length > 0)) return;

    let cancelled = false;
    setLoading(true);
    loadPhase(phaseId)
      .then((full) => {
        if (cancelled) return;
        setData((prev) => ({
          ...prev,
          phases: prev.phases.map((x) => (x.id === phaseId ? full : x)),
        }));
      })
      .catch((e) => console.error("Failed to load phase", phaseId, e))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, [phaseId, data.phases, setData]);

  const current = useMemo(
    () => data.phases.find((p) => p.id === phaseId) || data.phases[0],
    [data, phaseId]
  );

  const visibleModules = useMemo(
    () => filterModules(current.modules || [], q),
    [current, q]
  );

  function doExport() {
    const blob = new Blob([JSON.stringify({ data, store }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `cyber-notes-${new Date().toISOString().slice(0,10)}.json`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  function doImport(e) {
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
  }

  // map course code (NET100) -> module in phase
  function jumpToCourse(pid, courseCode) {
    const ph = data.phases.find((p) => p.id === pid);
    const mod = (ph?.modules || []).find(
      (m) => (m.badge && String(m.badge).toUpperCase() === courseCode.toUpperCase())
        || (m.title || "").toUpperCase().includes(courseCode.toUpperCase())
    );
    if (mod) {
      setPhaseId(pid);
      setView("notes");
      navigate(`/phase/${pid}/module/${mod.id}`);
    } else {
      // fallback: just jump to phase
      setPhaseId(pid);
      setView("notes");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* ===== Header ===== */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 dark:bg-gray-900/80 border-b dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="font-semibold tracking-tight">⚡ Cyber Phases Notes</div>

          {/* Tabs */}
          <div className="ml-4 flex rounded-lg overflow-hidden border dark:border-gray-700">
            <button
              onClick={() => setView("overview")}
              className={`px-3 py-1.5 text-sm ${view === "overview" ? "bg-gray-100 dark:bg-gray-800 font-medium" : "bg-white dark:bg-gray-900"}`}
            >
              Overview
            </button>
            <button
              onClick={() => setView("notes")}
              className={`px-3 py-1.5 text-sm ${view === "notes" ? "bg-gray-100 dark:bg-gray-800 font-medium" : "bg-white dark:bg-gray-900"}`}
            >
              Notes
            </button>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* theme toggle */}
            <button
              onClick={() => themeHook.setTheme(themeHook.theme === "dark" ? "light" : "dark")}
              className="px-2 py-1.5 rounded-lg border text-sm hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700"
              title="Toggle theme"
            >
              {themeHook.theme === "dark" ? "🌙" : "☀️"}
            </button>

            {view === "notes" && (
              <>
                <div className="relative">
                  <Icon name="search" className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Smart Search (title)…"
                    className="pl-7 pr-3 py-2 rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-700 w-56 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <button onClick={doExport} className="px-2.5 py-2 rounded-lg border text-sm hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700">
                  Export
                </button>
                <label className="px-2.5 py-2 rounded-lg border text-sm hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700 cursor-pointer">
                  Import
                  <input type="file" accept="application/json" className="hidden" onChange={doImport} />
                </label>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ===== Body ===== */}
      <main className="max-w-6xl mx-auto px-4 py-4">
        {view === "overview" ? (
          <Overview
            data={overview}
            activePhaseId={phaseId}
            onJumpToPhase={(pid) => { setPhaseId(pid); setView("notes"); }}
            onJumpToCourse={jumpToCourse}
          />
        ) : (
          <>
            {/* Phases bar */}
            <section aria-label="Phases" className="mb-4">
              <h2 className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">Phases</h2>
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
                        "text-left rounded-xl border bg-white dark:bg-gray-900 p-3 shadow-sm hover:shadow transition",
                        active ? "ring-2 ring-blue-400 border-blue-200 dark:ring-blue-500" : "border-gray-200 dark:border-gray-700"
                      ].join(" ")}
                    >
                      <div className="text-sm font-semibold truncate">{p.title}</div>
                      <div className="text-xs text-gray-500 truncate">{p.subtitle || ""}</div>
                      <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">{pct}% complete</div>
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
                  {/* Keeping only % on module cards; header can be clean */}
                  {loading ? <Spinner /> : null}
                </div>
              </div>

              {/* Module buttons */}
              {(current.modules || []).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {visibleModules.map((mod) => {
                    const st = moduleStats(mod, store);
                    return (
                      <button
                        key={`btn-${mod.id}`}
                        onClick={() => {
                          // ensure phase in state for breadcrumbs
                          setPhaseId(current.id);
                          navigate(`/phase/${current.id}/module/${mod.id}`);
                        }}
                        className="text-left rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 shadow-sm hover:shadow transition"
                        title={`Open ${mod.title}`}
                      >
                        <div className="text-sm font-semibold truncate">{mod.title}</div>
                        <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                          {st.pct}% complete
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-sm text-gray-500"><Spinner label="Loading phase…" /></div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

// ===============================
// Module Page → day buttons
// ===============================
function ModulePage({ data, setData, store }) {
  const { phaseId, moduleId } = useParams();
  const navigate = useNavigate();

  const phase = useMemo(
    () => data.phases.find((p) => p.id === phaseId),
    [data.phases, phaseId]
  );

  // ensure lazy load
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!phase || (phase.modules && phase.modules.length > 0)) return;
    let cancelled = false;
    setLoading(true);
    loadPhase(phaseId)
      .then((full) => {
        if (cancelled) return;
        setData((prev) => ({
          ...prev,
          phases: prev.phases.map((x) => (x.id === phaseId ? full : x)),
        }));
      })
      .catch((e) => console.error("Failed to load phase", phaseId, e))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [phase, phaseId, setData]);

  const mod = useMemo(() => (phase?.modules || []).find((m) => m.id === moduleId), [phase, moduleId]);

  const days = useMemo(() => groupSectionsByDay(mod?.sections || []), [mod]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 dark:bg-gray-900/80 border-b dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="font-semibold tracking-tight">⚡ Cyber Phases Notes</div>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/" className="text-sm px-3 py-1.5 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700">← Back</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-4">
        {!phase || !mod ? (
          <Spinner label="Loading module…" />
        ) : (
          <>
            <div className="mb-4">
              <div className="text-xs text-gray-500">{phase.title}</div>
              <h1 className="text-xl font-bold">{mod.title}</h1>
            </div>

            <h2 className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">Days</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {days.map((d) => {
                // compute % per day
                let total = 0, done = 0;
                (d.sections || []).forEach((s) =>
                  (s.items || []).forEach((it) => {
                    if (it.type === "discussion") return; // hide discussions
                    total++;
                    if (store.items[it.id]?.done) done++;
                  })
                );
                const pct = total ? Math.round((done / total) * 100) : 0;

                return (
                  <button
                    key={d.key}
                    onClick={() => navigate(`/phase/${phaseId}/module/${moduleId}/day/${d.key}`)}
                    className="text-left rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 shadow-sm hover:shadow transition"
                  >
                    <div className="text-sm font-semibold">{d.title}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">{pct}% complete</div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// ===============================
// Day Page → items with search
// ===============================
function DayPage({ data, store, setStore }) {
  const { phaseId, moduleId, dayKey } = useParams();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const phase = useMemo(
    () => data.phases.find((p) => p.id === phaseId),
    [data.phases, phaseId]
  );
  const mod = useMemo(() => (phase?.modules || []).find((m) => m.id === moduleId), [phase, moduleId]);
  const day = useMemo(() => {
    const days = groupSectionsByDay(mod?.sections || []);
    return days.find((d) => d.key === dayKey);
  }, [mod, dayKey]);

  const toggleDone = (id) => {
    setStore((s) => ({ ...s, items: { ...s.items, [id]: { ...s.items[id], done: !s.items[id]?.done } } }));
  };
  const saveNote = (id, txt) => {
    setStore((s) => ({ ...s, items: { ...s.items, [id]: { ...s.items[id], notes: txt } } }));
  };

  const items = useMemo(() => {
    const all = (day?.sections || []).flatMap((s) => s.items || []);
    const filtered = all
      .filter((it) => it.type !== "discussion")
      .filter((it) => (it.title || "").toLowerCase().includes(q.trim().toLowerCase()));
    return filtered;
  }, [day, q]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 dark:bg-gray-900/80 border-b dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="font-semibold tracking-tight">⚡ Cyber Phases Notes</div>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="text-sm px-3 py-1.5 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700"
            >
              ← Back
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-4">
        {!phase || !mod || !day ? (
          <Spinner label="Loading day…" />
        ) : (
          <>
            <div className="mb-3">
              <div className="text-xs text-gray-500">{phase.title} • {mod.title}</div>
              <h1 className="text-xl font-bold">{day.title}</h1>
            </div>

            <div className="relative mb-3">
              <Icon name="search" className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search items in this day…"
                className="pl-7 pr-3 py-2 rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-700 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Render items as checkable rows (quizzes included) */}
            <div className="border rounded-2xl bg-white dark:bg-gray-900 dark:border-gray-700 p-2">
              {items.length === 0 ? (
                <div className="text-sm text-gray-500 p-3">No matching items.</div>
              ) : (
                items.map((it) => (
                  <div key={it.id} className="px-2">
                    <div className="border-b last:border-b-0 dark:border-gray-800">
                      <div className="py-1">
                        {/* reuse ItemRow for consistent UX */}
                        {/* ItemRow already shows a checkbox; no points shown anywhere */}
                        {/* @ts-ignore */}
                        <import-placeholder />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// We can’t really import inside JSX; the above placeholder is just to signal that ItemRow is used.
// Replace that block with the actual ItemRow call:
function DayPageFixed(props) {
  // wrapper to use ItemRow correctly
  const { data, store, setStore } = props;
  const { phaseId, moduleId, dayKey } = useParams();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const phase = useMemo(() => data.phases.find((p) => p.id === phaseId), [data.phases, phaseId]);
  const mod = useMemo(() => (phase?.modules || []).find((m) => m.id === moduleId), [phase, moduleId]);
  const day = useMemo(() => {
    const days = groupSectionsByDay(mod?.sections || []);
    return days.find((d) => d.key === dayKey);
  }, [mod, dayKey]);

  const toggleDone = (id) => setStore((s) => ({ ...s, items: { ...s.items, [id]: { ...s.items[id], done: !s.items[id]?.done } } }));
  const saveNote = (id, txt) => setStore((s) => ({ ...s, items: { ...s.items, [id]: { ...s.items[id], notes: txt } } }));

  const items = useMemo(() => {
    const all = (day?.sections || []).flatMap((s) => s.items || []);
    return all
      .filter((it) => it.type !== "discussion")
      .filter((it) => (it.title || "").toLowerCase().includes(q.trim().toLowerCase()));
  }, [day, q]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 dark:bg-gray-900/80 border-b dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="font-semibold tracking-tight">⚡ Cyber Phases Notes</div>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="text-sm px-3 py-1.5 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700"
            >
              ← Back
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-4">
        {!phase || !mod || !day ? (
          <Spinner label="Loading day…" />
        ) : (
          <>
            <div className="mb-3">
              <div className="text-xs text-gray-500">{phase.title} • {mod.title}</div>
              <h1 className="text-xl font-bold">{day.title}</h1>
            </div>

            <div className="relative mb-3">
              <Icon name="search" className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search items in this day…"
                className="pl-7 pr-3 py-2 rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-700 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="border rounded-2xl bg-white dark:bg-gray-900 dark:border-gray-700 p-2">
              {items.length === 0 ? (
                <div className="text-sm text-gray-500 p-3">No matching items.</div>
              ) : (
                items.map((it) => (
                  <ItemRow
                    key={it.id}
                    item={it}
                    state={store.items[it.id]}
                    onToggleDone={toggleDone}
                    onSaveNote={saveNote}
                  />
                ))
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// ===============================
// App shell with router
// ===============================
export default function App() {
  const [data, setData] = useState(starter);
  const [store, setStore] = useState({ items: {} });
  const [phaseId, setPhaseId] = useState(starter.phases[0].id);
  const [q, setQ] = useState("");
  const [view, setView] = useState("overview");
  const themeHook = useTheme();

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
              themeHook={themeHook}
            />
          }
        />
        <Route
          path="/phase/:phaseId/module/:moduleId"
          element={<ModulePage data={data} setData={setData} store={store} />}
        />
        <Route
          path="/phase/:phaseId/module/:moduleId/day/:dayKey"
          element={<DayPageFixed data={data} store={store} setStore={setStore} />}
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
              themeHook={themeHook}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
}
