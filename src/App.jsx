import { useEffect, useMemo, useState } from "react";
import { starter } from "./data/starter";
import { LS_KEY, minutesToHMS } from "./utils/format";
import { ModuleBlock } from "./components/ModuleBlock";
import { Icon } from "./components/Icon"; // ✅ needed for search icon + buttons

// --- helpers ---
function filterModules(modules, term) {
  const q = term.trim().toLowerCase();
  if (!q) return modules;
  return (modules || [])
    .map((m) => ({
      ...m,
      sections: m.sections
        .map((s) => ({ ...s, items: s.items.filter((it) => it.title.toLowerCase().includes(q)) }))
        .filter((s) => s.items.length > 0),
    }))
    .filter((m) => m.sections.length > 0);
}

export default function App() {
  const [data, setData] = useState(starter);
  const [store, setStore] = useState({ items: {} });
  const [phaseId, setPhaseId] = useState(starter.phases[0].id);
  const [q, setQ] = useState("");
  const [showAdd, setShowAdd] = useState(false); // ✅ quick add toggle

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

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ data, store, phaseId }));
  }, [data, store, phaseId]);

  const current = useMemo(
    () => data.phases.find((p) => p.id === phaseId) || data.phases[0],
    [data, phaseId]
  );

  const phaseProgress = useMemo(() => {
    let total = 0, done = 0, time = 0, pts = 0;
    current.modules.forEach((m) =>
      m.sections.forEach((s) =>
        s.items.forEach((it) => {
          total++;
          if (store.items[it.id]?.done) done++;
          if (it.meta?.timeMin) time += it.meta.timeMin;
          if (it.meta?.points) pts += it.meta.points;
        })
      )
    );
    return { total, done, pct: total ? (done / total) * 100 : 0, time, pts };
  }, [current, store]);

  // ✅ derived filtered list
  const filteredModules = useMemo(
    () => filterModules(current.modules, q),
    [current, q]
  );

  // ✅ quick add item
  function addQuickItem() {
    const title = document.getElementById("quickTitle")?.value?.trim();
    const type = document.getElementById("quickType")?.value || "page";
    if (!title) return;
    setData((d) => {
      const copy = structuredClone ? structuredClone(d) : JSON.parse(JSON.stringify(d));
      const phase = copy.phases.find((p) => p.id === phaseId);
      if (!phase?.modules?.length) return d;
      const firstModule = phase.modules[0];
      const sec = firstModule.sections[0];
      const id = (crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2, 10));
      sec.items.unshift({ id, type, title });
      return copy;
    });
    document.getElementById("quickTitle").value = "";
  }

  // ✅ export/import
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
      } catch {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="font-semibold tracking-tight">⚡ Cyber Phases Notes</div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Icon name="search" className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Smart Search (title)…"
                className="pl-7 pr-3 py-2 rounded-lg border bg-white w-56 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button onClick={doExport} className="px-2.5 py-2 rounded-lg border text-sm hover:bg-gray-100 flex items-center gap-1">
              Export
            </button>
            <label className="px-2.5 py-2 rounded-lg border text-sm hover:bg-gray-100 flex items-center gap-1 cursor-pointer">
              Import
              <input type="file" accept="application/json" className="hidden" onChange={doImport} />
            </label>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-[240px,1fr] gap-4">
        <aside className="md:sticky md:top-[60px] h-max">
          <div className="bg-white border rounded-2xl p-3 shadow-sm">
            <div className="text-xs font-semibold text-gray-600 mb-2">Phases</div>
            <div className="space-y-2">
              {data.phases.map((p) => {
                let total = 0, done = 0;
                p.modules.forEach((m) =>
                  m.sections.forEach((s) =>
                    s.items.forEach((it) => {
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
                    className={`w-full text-left px-3 py-2 rounded-xl border ${active ? "bg-blue-50 border-blue-200" : "bg-white hover:bg-gray-50"}`}
                  >
                    <div className="text-sm font-semibold">
                      {p.title} <span className="text-xs text-gray-500">• {pct}%</span>
                    </div>
                    <div className="text-xs text-gray-500">{p.subtitle || ""}</div>
                  </button>
                );
              })}
            </div>

            {/* ✅ Quick add panel */}
            <div className="mt-4 border-t pt-3">
              <button
                onClick={() => setShowAdd((s) => !s)}
                className="text-sm px-2 py-1.5 rounded-lg border w-full flex items-center justify-center gap-1 hover:bg-gray-50"
              >
                <Icon name="plus" /> Quick add item
              </button>
              {showAdd && (
                <div className="mt-2 flex flex-col gap-2">
                  <input id="quickTitle" placeholder="Title…" className="text-sm px-2 py-1.5 rounded-lg border" />
                  <select id="quickType" className="text-sm px-2 py-1.5 rounded-lg border">
                    <option value="page">Page</option>
                    <option value="video">Video</option>
                    <option value="attachment">Attachment</option>
                    <option value="quiz">Quiz</option>
                    <option value="note">Note</option>
                  </select>
                  <button onClick={addQuickItem} className="text-sm px-2 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>

        <section>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold">{current.title}</h1>
              <div className="text-sm text-gray-500">{current.subtitle || ""}</div>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                {minutesToHMS(phaseProgress.time)}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                {phaseProgress.pts} pts
              </span>
              <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                {phaseProgress.done}/{phaseProgress.total} • {Math.round(phaseProgress.pct)}%
              </span>
            </div>
          </div>

          {/* filtered render */}
          {filteredModules.length === 0 ? (
            <div className="text-sm text-gray-500">No results. Try a different search.</div>
          ) : (
            filteredModules.map((mod) => (
              <ModuleBlock key={mod.id} module={mod} store={store} setStore={setStore} />
            ))
          )}
        </section>
      </main>
    </div>
  );
}
