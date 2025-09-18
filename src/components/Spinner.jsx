export default function Spinner({ label = "Loading…" }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 py-6 justify-center">
      <span className="loading loading-spinner loading-md" aria-hidden />
      <span>{label}</span>
    </div>
  );
}
