import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "./Icon";
import { ItemRow } from "./ItemRow";

function Pill({ children }) {
  return <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">{children}</span>;
}
function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-2 mt-3 mb-2 text-sm font-semibold text-gray-700">
      <span className="w-1.5 h-4 bg-gray-300 rounded" />
      {title}
    </div>
  );
}

/* ---------- Day grouping helpers ---------- */
function detectGroup(sec) {
  const id = (sec.id || "").toLowerCase();
  const t = (sec.title || "").toLowerCase();

  let m = id.match(/-d(\d+)\b/) || id.match(/\bd(\d+)\b/);
  if (m) return `Day ${Number(m[1])}`;
  m = t.match(/\bday\s*([0-9]+)/i);
  if (m) return `Day ${Number(m[1])}`;

  m = id.match(/-m(\d+)\b/) || t.match(/\bm\s*([0-9]+)/i);
  if (m) return `M${Number(m[1])}`;

  return "Other";
}
const groupSlug = (label) => label.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

function sortGroupKeys(a, b) {
  const key = (label) => {
    let m = label.match(/^Day (\d+)/i);
    if (m) return { t: 1, n: +m[1] };
    m = label.match(/^M(\d+)/i);
    if (m) return { t: 2, n: +m[1] };
    return { t: 9, n: 0 };
  };
  const A = key(a), B = key(b);
  if (A.t !== B.t) return A.t - B.t;
  return A.n - B.n;
}

export function ModuleBlock({ module, store, setStore }) {
  const [open, setOpen] = useState(true);
  const [openGroups, setOpenGroups] = useState({});
  const { phaseId, moduleId } = useParams(); // used to build day links

  // Build groups
  const groups = useMemo(() => {
    const map = {};
    (module.sections || []).forEach((sec) => {
      const g = detectGroup(sec);
      (map[g] = map[g] || []).push(sec);
    });
    return map;
  }, [module.sections]);

  // Module percentage only (no points/time)
  const modStats = useMemo(() => {
    let total = 0, done = 0;
    (module.sections || []).forEach((sec) =>
      (sec.items || []).forEach((it) => {
        total++;
        if (store.items[it.id]?.done) done++;
      })
    );
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [module, store]);

  // Per-group stats
  const groupStats = useMemo(() => {
    const gs = {};
    Object.entries(groups).forEach(([g, secs]) => {
      let total = 0, done = 0;
      secs.forEach((sec) =>
        (sec.items || []).forEach((it) => {
          total++;
          if (store.items[it.id]?.done) done++;
        })
      );
      gs[g] = { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
    });
    return gs;
  }, [groups, store]);

  const toggleDone = (id) => {
    setStore((s) => ({ ...s, items: { ...s.items, [id]: { ...s.items[id], done: !s.items[id]?.done } } }));
  };
  const saveNote = (id, txt) => {
    setStore((s) => ({ ...s, items: { ...s.items, [id]: { ...s.items[id], notes: txt } } }));
  };

  return (
    <div className="mb-6 border rounded-2xl bg-white shadow-sm">
      {/* Module header */}
      <button onClick={() => setOpen((o) => !o)} className="w-full text-left px-4 py-3 flex items-center justify-between">
        <div>
          <div className="font-semibold text-gray-800">{module.title}</div>
          <div className="text-xs text-gray-500 mt-0.5 flex gap-2 items-center">
            <Pill>{modStats.pct}%</Pill>
          </div>
        </div>
        <Icon name="more" className="w-5 h-5 text-gray-400" />
      </button>

      {/* Day groups */}
      {open && (
        <div className="px-4 pb-4">
          {Object.keys(groups).sort(sortGroupKeys).map((g) => {
            const secs = groups[g];
            const st = groupStats[g] || { pct: 0 };
            const isOpen = openGroups[g] ?? true;
            const slug = groupSlug(g);

            return (
              <div key={g} className="mt-3">
                <div className="flex items-center justify-between">
                  <button
                    className="text-left text-sm font-semibold text-gray-800"
                    onClick={() => setOpenGroups((og) => ({ ...og, [g]: !isOpen }))}
                    title={isOpen ? "Collapse" : "Expand"}
                  >
                    {g}
                  </button>
                  <div className="flex items-center gap-2">
                    <Pill>{st.pct}%</Pill>
                    {/* 👉 open this Day on its own page */}
                    <Link
                      to={`/phase/${phaseId}/module/${moduleId}/day/${slug}`}
                      className="text-xs px-2 py-1 border rounded-lg hover:bg-gray-100"
                      title={`Open ${g}`}
                    >
                      Open
                    </Link>
                  </div>
                </div>

                {isOpen && (
                  <div className="mt-1">
                    {secs.map((sec) => (
                      <div key={sec.id}>
                        {/* show section title if it’s not a bare “Day N / M#” label */}
                        {!/^(day\s*\d+|m\d+)$/i.test((sec.title || "").toLowerCase()) && (
                          <SectionHeader title={sec.title} />
                        )}
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
          })}
        </div>
      )}
    </div>
  );
}
