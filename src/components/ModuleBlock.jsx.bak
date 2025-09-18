// src/components/ModuleBlock.jsx
import { useMemo, useState } from "react";
import { Icon } from "./Icon";
import { ItemRow } from "./ItemRow";
import { minutesToHMS } from "../utils/format";

function Pill({ children }) {
  return <span className="px-2 py-0.5 rounded-full text-xs bg-base-200 text-base-content/80">{children}</span>;
}

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-2 mt-4 mb-2 text-sm font-semibold text-base-content/70">
      <span className="w-1.5 h-4 bg-base-300 rounded" />
      {title}
    </div>
  );
}

export function ModuleBlock({ module, store, setStore }) {
  const [open, setOpen] = useState(true);

  const stats = useMemo(() => {
    let time = 0, total = 0, done = 0;
    (module.sections || []).forEach((sec) =>
      (sec.items || []).forEach((it) => {
        if (it.type === "discussion") return; // hide discussions
        total++;
        if (store.items[it.id]?.done) done++;
        if (it.meta?.timeMin) time += it.meta.timeMin;
      })
    );
    return { time, total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [module, store]);

  const toggleDone = (id) => {
    setStore((s) => ({
      ...s,
      items: { ...s.items, [id]: { ...s.items[id], done: !s.items[id]?.done } },
    }));
  };
  const saveNote = (id, txt) => {
    setStore((s) => ({ ...s, items: { ...s.items, [id]: { ...s.items[id], notes: txt } } }));
  };

  return (
    <div className="mb-6 border rounded-2xl bg-base-100 shadow-sm">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-4 py-3 flex items-center justify-between"
      >
        <div>
          <div className="font-semibold text-base-content">{module.title}</div>
          <div className="text-xs mt-1 flex gap-2 items-center text-base-content/70">
            <Pill><Icon name="time" className="w-3.5 h-3.5" /> {minutesToHMS(stats.time)}</Pill>
            <Pill>{stats.done}/{stats.total} • {stats.pct}%</Pill>
          </div>
        </div>
        <Icon name="more" className="w-5 h-5 text-base-content/50" />
      </button>

      {open && (
        <div className="px-4 pb-4">
          {(module.sections || []).map((sec) => (
            <div key={sec.id}>
              <SectionHeader title={sec.title} />
              {(sec.items || [])
                .filter((it) => it.type !== "discussion")
                .map((it) => (
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
