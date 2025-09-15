import React from "react";

function Card({ children }) {
  return <div className="rounded-xl border bg-white p-4 shadow-sm">{children}</div>;
}

// color mapping by course prefix
function classFor(code) {
  const key = code?.startsWith("Cap") ? "CAP" : (code || "").replace(/[0-9].*$/, "").toUpperCase();
  switch (key) {
    case "NET": return "bg-green-100 border-green-300 text-gray-900";
    case "SYS": return "bg-blue-100 border-blue-300 text-gray-900";
    case "CRY": return "bg-yellow-100 border-yellow-300 text-gray-900";
    case "APP": return "bg-green-500 border-green-600 text-white";
    case "PYT": return "bg-gray-300 border-gray-400 text-gray-900";
    case "SIE": return "bg-orange-500 border-orange-600 text-white";
    case "GRC": return "bg-sky-500 border-sky-600 text-white";
    case "CTI": return "bg-pink-200 border-pink-300 text-gray-900";
    case "CAP": return "bg-purple-200 border-purple-300 text-gray-900";
    default:    return "bg-white border-gray-300 text-gray-900";
  }
}

export default function Overview({ data, onJumpToPhase, activePhaseId }) {
  const { intro, note, phaseCards, courseGrid, courses } = data;

  // helper to turn phase index → id (1-based)
  const pid = (i) => `phase${i}`;

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-lg font-bold mb-2">Program Overview</h1>
        <p className="text-sm text-gray-700">{intro}</p>
        <p className="text-xs text-gray-500 mt-2">{note}</p>
      </Card>

      <section>
        <h2 className="text-sm font-semibold text-gray-600 mb-2">Phases</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {phaseCards.map((p) => (
            <Card key={p.id}>
              <div className="font-semibold">{p.title}</div>
              <p className="text-sm text-gray-700 mt-1">{p.summary}</p>
              {p.applied?.length > 0 && (
                <details className="mt-2">
                  <summary className="text-sm text-blue-600 cursor-pointer">Applied activities</summary>
                  <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 space-y-1">
                    {p.applied.map((li, i) => <li key={i}>{li}</li>)}
                  </ul>
                </details>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Colored matrix like your screenshot */}
      <section>
        <h2 className="text-sm font-semibold text-gray-600 mb-2">Courses at a glance</h2>
        <Card>
          {/* Header row */}
          <div className="grid grid-cols-5 gap-0 border rounded-lg overflow-hidden">
            {[1,2,3,4,5].map((n) => {
              const active = activePhaseId === pid(n);
              return (
                <button
                  key={`hdr-${n}`}
                  type="button"
                  onClick={() => onJumpToPhase?.(pid(n))}
                  className={[
                    "bg-gray-400 text-white font-semibold px-3 py-2 border-r last:border-r-0",
                    active ? "outline outline-2 outline-black text-yellow-300" : ""
                  ].join(" ")}
                  title={`Go to Phase ${n}`}
                >
                  Phase {n}
                </button>
              );
            })}
          </div>

          {/* Body rows */}
          <div className="grid grid-cols-5 gap-0 border-x border-b rounded-b-lg overflow-hidden">
            {courseGrid.map((row, rIdx) =>
              row.map((code, cIdx) => {
                const n = cIdx + 1;
                const cellClasses = classFor(code);
                return (
                  <button
                    key={`${code}-${rIdx}-${cIdx}`}
                    type="button"
                    onClick={() => onJumpToPhase?.(pid(n))}
                    className={[
                      "px-3 py-2 text-center border border-gray-300 !border-l-0 !border-t-0",
                      cellClasses,
                      "hover:brightness-95 transition"
                    ].join(" ")}
                    title={`Open Phase ${n}`}
                  >
                    <div className="font-medium">{code}</div>
                    <div className="text-[11px] opacity-80">{`Phase ${n}`}</div>
                  </button>
                );
              })
            )}
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-gray-600 mb-2">Course Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {courses.map((c) => (
            <Card key={c.key}>
              <div className="font-semibold">{c.name}</div>
              <p className="text-sm text-gray-700 mt-1">{c.description}</p>

              {c.programObjectives?.length > 0 && (
                <details className="mt-2">
                  <summary className="text-sm text-blue-600 cursor-pointer">Program Objectives</summary>
                  <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 space-y-1">
                    {c.programObjectives.map((li, i) => <li key={i}>{li}</li>)}
                  </ul>
                </details>
              )}

              {c.modules?.length > 0 && (
                <details className="mt-2">
                  <summary className="text-sm text-blue-600 cursor-pointer">Modules & Objectives</summary>
                  <div className="mt-1 space-y-2">
                    {c.modules.map((m) => (
                      <div key={m.code}>
                        <div className="text-sm font-medium">{m.code}</div>
                        <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 space-y-1">
                          {m.objectives.map((li, i) => <li key={i}>{li}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
