// A compact “Courses at a glance” board with phase columns.
// Click a course chip (e.g., NET100) to jump directly to the module.
// Props:
// - data: { phases: [{ id, title, courses: ['NET100','SYS100', ...] }] }
// - activePhaseId
// - onJumpToPhase(phaseId)
// - onJumpToCourse(phaseId, courseCode)
export default function Overview({ data, activePhaseId, onJumpToPhase, onJumpToCourse }) {
  const phases = data?.phases || [];

  const chipStyle =
    "w-full text-center py-2 rounded-xl text-sm font-medium border shadow-sm hover:shadow transition " +
    "bg-white/90 border-gray-200 text-gray-700 hover:bg-gray-50 " +
    "dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800";

  const headerStyle =
    "text-center font-semibold text-gray-700 dark:text-gray-200 text-base bg-gray-100 dark:bg-gray-800 rounded-xl py-2";

  const lanes = [
    "bg-emerald-50 dark:bg-emerald-900/30",
    "bg-sky-50 dark:bg-sky-900/30",
    "bg-amber-50 dark:bg-amber-900/30",
    "bg-rose-50 dark:bg-rose-900/30",
    "bg-cyan-50 dark:bg-cyan-900/30",
  ];

  return (
    <section className="mt-3">
      <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Courses at a glance</h2>
      <div className="rounded-2xl border bg-white dark:bg-gray-950 dark:border-gray-800 p-4 overflow-x-auto">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 min-w-[760px]">
          {phases.map((ph, idx) => (
            <div
              key={ph.id}
              className={[
                "rounded-xl p-3 border",
                ph.id === activePhaseId
                  ? "border-blue-300 ring-2 ring-blue-300"
                  : "border-gray-200 dark:border-gray-800",
                lanes[idx % lanes.length],
              ].join(" ")}
            >
              <button
                onClick={() => onJumpToPhase?.(ph.id)}
                className={headerStyle}
                title={`Open ${ph.title}`}
              >
                {ph.title}
              </button>

              <div className="mt-3 space-y-2">
                {(ph.courses || []).map((code) => (
                  <button
                    key={code}
                    className={chipStyle}
                    onClick={() => onJumpToCourse?.(ph.id, code)}
                    title={`Open ${code}`}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
