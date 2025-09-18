// src/pages/DayPage.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { ItemRow } from "../components/ItemRow";
import { Icon } from "../components/Icon";
import { minutesToHMS } from "../utils/format";
import { loadPhase } from "../data/loadPhase";

function groupKeyFromSectionId(id = "") {
  // take the first two segments like "p1-sys100-d1" or "sys200-d2"
  // e.g. p1-sys100-d1-videos => p1-sys100-d1
  const parts = id.split("-");
  const dIndex = parts.findIndex((p) => /^d\d+$/i.test(p));
  if (dIndex > 0) return parts.slice(0, dIndex + 1).join("-");
  // fallback: first 2 segments
  return parts.slice(0, 2).join("-");
}

export default function DayPage({ data, setData, store, setStore }) {
  const { phaseId, moduleId, dayKey } = useParams();
  const [q, setQ] = useState("");

  const phase = useMemo(() => data.phases.find((p) => p.id === phaseId), [data.phases, phaseId]);

  // ensure the phase is loaded (lazy)
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

  const itemsForDay = useMemo(() => {
    if (!module) return [];
    const all = [];
    (module.sections || []).forEach((sec) => {
      if (groupKeyFromSectionId(sec.id) !== dayKey) return;
      (sec.items || []).forEach((it) => {
        if (it.type === "discussion") return; // hidden globally
        all.push(it);
      });
    });
    return all;
  }, [module, dayKey]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return itemsForDay;
    return itemsForDay.filter((it) => (it.title || "").toLowerCase().includes(term));
  }, [itemsForDay, q]);

  const stats = useMemo(() => {
    let time = 0, total = 0, done = 0;
    itemsForDay.forEach((it) => {
      total++;
      if (store.items[it.id]?.done) done++;
      if (it.meta?.timeMin) time += it.meta.timeMin;
    });
    return { time, total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [itemsForDay, store]);

  const toggleDone = (id) => {
    setStore((s) => ({ ...s, items: { ...s.items, [id]: { ...s.items[id], done: !s.items[id]?.done } } }));
  };
  const saveNote = (id, txt) => {
    setStore((s) => ({ ...s, items: { ...s.items, [id]: { ...s.items[id], notes: txt } } }));
  };

  if (!phase || !module) return <Spinner label="Loading day…" />;

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <header className="sticky top-0 z-10 backdrop-blur bg-base-100/80 border-b border-base-300">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="font-semibold tracking-tight">⚡ Cyber Phases Notes</div>
          <div className="ml-auto flex gap-2">
            <Link to={`/phase/${phaseId}/module/${moduleId}`} className="btn btn-sm">
              ← Back to module
            </Link>
            <Link to="/" className="btn btn-sm btn-ghost">Home</Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-4">
        <div className="mb-4">
          <div className="text-xs opacity-70">{phase.title}</div>
          <h1 className="text-xl font-bold">{module.title}</h1>
          <div className="mt-1 text-sm flex gap-2 items-center">
            <span className="badge badge-outline">{stats.done}/{stats.total}</span>
            <span className="badge badge-primary">{stats.pct}%</span>
            <span className="badge">{minutesToHMS(stats.time)}</span>
          </div>
        </div>

        <div className="mb-3">
          <div className="relative w-full sm:w-80">
            <Icon name="search" className="w-4 h-4 absolute left-3 top-3 opacity-50" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search in this day…"
              className="input input-bordered w-full pl-9"
            />
          </div>
        </div>

        <div>
          {filtered.length === 0 ? (
            <div className="text-sm opacity-70">No matches today.</div>
          ) : (
            filtered.map((it) => (
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
      </main>
    </div>
  );
}
