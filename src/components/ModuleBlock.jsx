import ItemRow from "./ItemRowCompat.jsx";

function cleanItem(it) {
  if (!it || it.type === "discussion") return null;
  const meta = it.meta && typeof it.meta === "object" ? { ...it.meta } : undefined;
  if (meta && "points" in meta) delete meta.points;
  return meta ? { ...it, meta } : { ...it };
}

export default function ModuleBlock({ module, query = "" }) {
  if (!module) return null;

  const q = String(query || "").trim().toLowerCase();
  const matches = (txt) => (!q ? true : String(txt || "").toLowerCase().includes(q));

  const sections = Array.isArray(module.sections) ? module.sections : [];

  const baseSections = sections
    .map((sec) => {
      const items = (Array.isArray(sec.items) ? sec.items : [])
        .filter((it) => it?.type !== "discussion")
        .map(cleanItem)
        .filter(Boolean);
      return { ...sec, items };
    })
    .filter((sec) => sec.items && sec.items.length > 0);

  const filteredSections = baseSections
    .map((sec) => {
      const items = sec.items.filter((it) => matches(it?.title));
      return { ...sec, items };
    })
    .filter((sec) => sec.items && sec.items.length > 0);

  const visible = q ? filteredSections : baseSections;

  return (
    <div className="space-y-6">
      {visible.map((section) => (
        <section key={section.id || section.title} className="border border-base-300/60 rounded-xl">
          <header className="px-4 py-3 border-b border-base-300/60 bg-base-200">
            <h2 className="font-semibold">{section.title}</h2>
          </header>
          <div className="p-3">
            {section.items.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}

      {!visible.length && (
        <div className="p-6 text-base-content/70">No items match your search.</div>
      )}
    </div>
  );
}
