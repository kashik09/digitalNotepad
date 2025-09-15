import { useEffect, useMemo, useState } from "react";
import { starter } from "./data/starter";
import { LS_KEY, minutesToHMS } from "./utils/format";

export default function App() {
  const [data, setData] = useState(starter);
  const [store, setStore] = useState({ items: {} });
  const [phaseId, setPhaseId] = useState(starter.phases[0].id);
  const [q, setQ] = useState("");

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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="font-semibold tracking-tight">⚡ Cyber Phases Notes</div>
          <div className="ml-auto flex items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Smart Search..."
              className="pl-3 pr-3 py-2 rounded-lg border bg-white w-56 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
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
                    <div className="text-sm font-semibold">{p.title} <span className="text-xs text-gray-500">• {pct}%</span></div>
                    <div className="text-xs text-gray-500">{p.subtitle || ""}</div>
                  </button>
                );
              })}
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

          {/* placeholder: we will add modules UI next commit */}
          <div className="text-sm text-gray-500">Modules will render here…</div>
        </section>
      </main>
    </div>
  );
}