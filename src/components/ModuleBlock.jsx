import { useMemo, useState } from "react";
import { Icon } from "./Icon";
import { ItemRow } from "./ItemRow";

function Pill({ children }) {
  return <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">{children}</span>;
}

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-2 mt-4 mb-2 text-sm font-semibold text-gray-700">
      <span className="w-1.5 h-4 bg-gray-300 rounded" />
      {title}
    </div>
  );
}

export function ModuleBlock({ module, store, setStore }) {
  const [open, setOpen] = useState(true);

  const stats = useMemo(() => {
    let total = 0, done = 0;
    (module.sections || []).forEach((sec) =>
      (sec.items || []).forEach((it) => {
        total++;
        if (store.items[it.id]?.done) done++;
      })
    );
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [module, store]);

  const toggleDone = (id) => {
    setStore((s) => ({
      ...s,
      items: { ...s.items, [id]: { ...s.items[id], done: !s.items[id]?.done } },
    }));
  };
  const saveNote = (id, txt) => {
    setStore((s) => ({
      ...s,
      items: { ...s.items, [id]: { ...s.items[id], notes: txt } },
    }));
  };

  return (
    <div className="mb-6 border rounded-2xl bg-white shadow-sm">
      <button onClick={() => setOpen((o) => !o)} className="w-full text-left px-4 py-3 flex items-center justify-between">
        <div>
          <div className="font-semibold text-gray-800">{module.title}</div>
          <div className="text-xs text-gray-500 mt-0.5 flex gap-2 items-center">
            {/* % only */}
            <Pill>{stats.pct}%</Pill>
          </div>
        </div>
        <Icon name="more" className="w-5 h-5 text-gray-400" />
      </button>

      {open && (
        <div className="px-4 pb-4">
          {(module.sections || []).map((sec) => (
            <div key={sec.id}>
              <SectionHeader title={sec.title} />
              {(sec.items || []).map((it) => (
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
