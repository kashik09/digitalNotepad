import overviewData from "../data/overview-software.js";

export default function OverviewSoftware() {
  const cards = Array.isArray(overviewData) ? overviewData : [];

  if (!cards.length) {
    return (
      <div className="p-6 text-base-content/70">
        No overview data yet. Add entries to <code>src/data/overview-software.js</code>.
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <a
            key={c.id || c.title}
            href={c.href || "#"}
            className="card bg-base-200 hover:bg-base-300 border border-base-300/60 transition-colors"
          >
            <div className="card-body">
              <h3 className="card-title text-base-content">{c.title}</h3>
              {c.subtitle ? (
                <p className="text-base-content/70">{c.subtitle}</p>
              ) : null}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
