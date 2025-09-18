import ItemRow from "./ItemRow.jsx";

export default function ModuleBlock({ module, query = "" }) {
  if (!module) return null;

  const q = String(query || "").trim().toLowerCase();

  const match = (txt) => {
    if (!q) return true;
    return String(txt || "").toLowerCase().includes(q);
  };

  const sections = Array.isArray(module.sections) ? module.sections : [];

  const filteredSections = sections
    .map((sec) => {
      const items = Array.isArray(sec.items) ? sec.items.filter(it => match(it.title)) : [];
      return { ...sec, items };
    })
    .filter((sec) => sec.items && sec.items.length > 0);

  const visibleSections = q ? filteredSections : sections;

  return (
    <div className="space-y-6">
      {(visibleSections || []).map((section) => (
        <section key={section.id || section.title} className="border border-base-300/60 rounded-xl">
          <header className="px-4 py-3 border-b border-base-300/60 bg-base-200">
            <h2 className="font-semibold">{section.title}</h2>
          </header>
          <div className="p-3">
            {(section.items || []).map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}

      {!visibleSections.length && (
        <div className="p-6 text-base-content/70">No items match your search.</div>
      )}
    </div>
  );
}
