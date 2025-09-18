import { useMemo, useState } from "react";
import { ItemRow } from "./ItemRow"; // keep your existing ItemRow
import Spinner from "./Spinner";

function Pill({ children }) {
  return <span className="px-2 py-0.5 rounded-full text-xs bg-base-200 text-base-content/70">{children}</span>;
}
function SectionHeader({ title }) {
  return <div className="flex items-center gap-2 mt-4 mb-2 text-sm font-semibold text-base-content/80">
    <span className="w-1.5 h-4 bg-base-300 rounded" />{title}
  </div>;
}

export function ModuleBlock({ module, store, setStore, loading = false }) {
  const [open, setOpen] = useState(true);

  const stats = useMemo(() => {
    let total = 0, done = 0;
    (module.sections || []).forEach((s) =>
      (s.items || []).forEach((it) => {
        if (it.type === "discussion") return; // hidden everywhere
        total++;
        if (store.items[it.id]?.done) done++;
      })
    );
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [module, store]);

  const toggleDone = (id) => {
    setStore((s) => ({ ...s, items: { ...s.items, [id]: { ...s.items[id], done: !s.items[id]?.done } } }));
  };
  const saveNote = (id, txt) => {
    setStore((s) => ({ ...s, items: { ...s.items, [id]: { ...s.items[id], notes: txt } } }));
  };

  return (
    <div className="mb-6 border rounded-2xl bg-base-100 shadow-sm border-base-300">
      <button onClick={() => setOpen((o) => !o)} className="w-full text-left px-4 py-3 flex items-center justify-between">
        <div>
          <div className="font-semibold">{module.title}</div>
          <div className="text-xs mt-0.5 flex gap-2 items-center text-base-content/70">
            {/* % ONLY */}
            <Pill>{stats.done}/{stats.total} • {stats.pct}%</Pill>
          </div>
        </div>
        <span className="opacity-60">{open ? "▾" : "▸"}</span>
      </button>

      {!open ? null : loading ? <Spinner label="Loading module…" /> : (
        <div className="px-4 pb-4">
          {(module.sections || []).map((sec) => (
            <div key={sec.id}>
              <SectionHeader title={sec.title} />
              {(sec.items || []).filter(it => it.type !== "discussion").map((it) => (
                <ItemRow
                  key={it.id}
                  item={it}
                  state={store.items[it.id]}
                  onToggleDone={toggleDone}
                  onSaveNote={saveNote}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default ModuleBlock;
