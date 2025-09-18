export default function Spinner({ label = "Loading…" }) {
  return (
    <div className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400">
      <span
        className="inline-block w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 border-t-transparent animate-spin"
        aria-label="Loading"
      />
      <span className="text-sm">{label}</span>
    </div>
  );
}
