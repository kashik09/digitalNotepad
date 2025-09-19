import { useEffect, useMemo, useState } from "react";

const SW_PROJECTS_KEY = "SOFT:projects";

function loadProjects() {
  try {
    const raw = localStorage.getItem(SW_PROJECTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  // seed examples
  return [
    { id: "p1", title: "CLI Password Manager", status: "in-progress", link: "", tags: ["node", "crypto"] },
    { id: "p2", title: "REST API + Auth", status: "planned", link: "", tags: ["express", "jwt"] },
  ];
}
function saveProjects(arr) {
  try { localStorage.setItem(SW_PROJECTS_KEY, JSON.stringify(arr)); } catch {}
}

function Tag({ children }) {
  return <span className="badge badge-outline">{children}</span>;
}

export default function SoftwareProjects() {
  const [items, setItems] = useState(loadProjects());
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ title: "", link: "", tags: "", status: "planned" });
  const [filter, setFilter] = useState("all");

  useEffect(() => { saveProjects(items); }, [items]);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter(p => p.status === filter);
  }, [items, filter]);

  function addItem() {
    if (!draft.title.trim()) return;
    const tags = draft.tags.split(",").map(s => s.trim()).filter(Boolean);
    const id = "p" + Date.now();
    setItems(prev => [...prev, { id, title: draft.title.trim(), link: draft.link.trim(), status: draft.status, tags }]);
    setDraft({ title: "", link: "", tags: "", status: "planned" });
    setOpen(false);
  }
  function delItem(id) {
    setItems(prev => prev.filter(p => p.id !== id));
  }
  function setStatus(id, status) {
    setItems(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between gap-2 mb-4">
        <h1 className="text-xl font-semibold">Software Projects</h1>
        <div className="flex items-center gap-2">
          <select className="select select-bordered select-sm" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="planned">Planned</option>
            <option value="in-progress">In-progress</option>
            <option value="done">Done</option>
          </select>
          <button className="btn btn-primary btn-sm" onClick={() => setOpen(true)}>Add Project</button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(p => (
          <div key={p.id} className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <div className="flex items-start justify-between gap-2">
                <h3 className="card-title text-base">{p.title}</h3>
                <div className="flex items-center gap-2">
                  <select
                    className="select select-bordered select-xs"
                    value={p.status}
                    onChange={e => setStatus(p.id, e.target.value)}
                  >
                    <option value="planned">planned</option>
                    <option value="in-progress">in-progress</option>
                    <option value="done">done</option>
                  </select>
                  <button className="btn btn-ghost btn-xs" onClick={() => delItem(p.id)}>✕</button>
                </div>
              </div>

              {p.link ? (
                <a className="link link-primary break-all" href={p.link} target="_blank" rel="noreferrer">{p.link}</a>
              ) : (
                <span className="text-base-content/60">No link</span>
              )}

              <div className="flex flex-wrap gap-1">
                {(p.tags || []).map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <div className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-semibold mb-2">Add Project</h3>
          <div className="space-y-2">
            <input className="input input-bordered w-full" placeholder="Title" value={draft.title} onChange={e => setDraft(s => ({ ...s, title: e.target.value }))} />
            <input className="input input-bordered w-full" placeholder="Link (optional)" value={draft.link} onChange={e => setDraft(s => ({ ...s, link: e.target.value }))} />
            <input className="input input-bordered w-full" placeholder="Tags (comma-separated)" value={draft.tags} onChange={e => setDraft(s => ({ ...s, tags: e.target.value }))} />
            <select className="select select-bordered w-full" value={draft.status} onChange={e => setDraft(s => ({ ...s, status: e.target.value }))}>
              <option value="planned">Planned</option>
              <option value="in-progress">In-progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={() => setOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={addItem}>Add</button>
          </div>
        </div>
        <div className="modal-backdrop" onClick={() => setOpen(false)} />
      </div>
    </div>
  );
}
