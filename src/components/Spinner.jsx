// src/components/Spinner.jsx
export default function Spinner({ label = "Loading…" }) {
  return (
    <div
      className="py-8 flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* daisyUI uses current theme; text-primary maps to the active theme color */}
      <span className="loading loading-spinner loading-md text-primary" />
      <span className="ml-2 text-sm text-base-content/70">{label}</span>
    </div>
  );
}
