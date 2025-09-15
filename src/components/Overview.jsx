// src/components/Overview.jsx
import React from "react";

function Card({ children }) {
  return <div className="rounded-xl border bg-white p-4 shadow-sm">{children}</div>;
}

export default function Overview({ data }) {
  const { intro, note, phaseCards, courseGrid, courses } = data;

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

      <section>
        <h2 className="text-sm font-semibold text-gray-600 mb-2">Courses at a glance</h2>
        <Card>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-sm">
            {courseGrid.flat().map((code, i) => (
              <div key={i} className="rounded-lg border px-2 py-1 text-center">{code}</div>
            ))}
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
