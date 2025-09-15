// src/components/Overview.jsx
import React from "react";

function Card({ children }) {
  return <div className="rounded-xl border bg-white p-4 shadow-sm">{children}</div>;
}

export default function Overview({ data, activePhaseId, onJumpToPhase }) {
  const { intro, note, phaseCards, courseGrid = [] } = data;

  // Phase → courses mapping (column layout like your screenshot)
  const phases = [
    { id: "phase1", title: "Phase 1", courses: ["NET100", "SYS100", "CRY100", "PYT100", "GRC100"] },
    { id: "phase2", title: "Phase 2", courses: ["NET200", "SYS200", "CRY200", "PYT200", "CTI100"] },
    { id: "phase3", title: "Phase 3", courses: ["NET300", "SYS300", "CRY300", "SIE100", "CTI200"] },
    { id: "phase4", title: "Phase 4", courses: ["NET400", "SYS400", "APP100", "SIE200", "GRC200"] },
    { id: "phase5", title: "Phase 5", courses: ["NET500", "SYS500", "APP200", "SIE300", "Capstone"] },
  ];

  // row colors for vibes ✨
  const rowBg = [
    "bg-emerald-100", // NET
    "bg-sky-100",     // SYS
    "bg-amber-100",   // CRY / APP
    "bg-orange-200",  // PYT / SIE
    "bg-cyan-200",    // GRC / CTI / Capstone
  ];

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-lg font-bold mb-2">Program Overview</h1>
        {intro && <p className="text-sm text-gray-700">{intro}</p>}
        {note && <p className="text-xs text-gray-500 mt-2">{note}</p>}
      </Card>

      {/* Phase blurbs */}
      {phaseCards?.length > 0 && (
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
      )}

      {/* Courses at a glance — clickable matrix */}
      <section>
        <h2 className="text-sm font-semibold text-gray-600 mb-2">Courses at a glance</h2>
        <Card>
          <div className="overflow-x-auto">
            <div className="inline-grid grid-cols-5 gap-2">
              {phases.map((ph, colIdx) => (
                <div
                  key={ph.id}
                  className={[
                    "rounded-lg border p-2 w-48",
                    ph.id === activePhaseId ? "ring-2 ring-blue-500 border-blue-300" : "border-gray-300",
                  ].join(" ")}
                >
                  <button
                    className="w-full text-center font-semibold text-gray-800 py-1 rounded-md bg-gray-300/60"
                    onClick={() => onJumpToPhase?.(ph.id)}
                  >
                    {ph.title}
                  </button>

                  <div className="mt-2 space-y-2">
                    {ph.courses.map((c, rowIdx) => (
                      <button
                        key={c}
                        className={[
                          "w-full text-center rounded-md border px-2 py-1 text-sm font-medium",
                          rowBg[rowIdx % rowBg.length],
                          "border-black/10 hover:brightness-95 transition",
                        ].join(" ")}
                        onClick={() => onJumpToPhase?.(ph.id)}
                        title={`Open ${ph.title}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      {/* Optional: keep any detailed course cards you pass in via data */}
      {courseGrid?.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Course Details</h2>
          {/* You can keep your previous detailed cards here if you like */}
        </section>
      )}
    </div>
  );
}
