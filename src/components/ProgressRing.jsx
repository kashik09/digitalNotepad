export default function ProgressRing({ value = 0, size = "md", label = true }) {
  const v = Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
  const sizeClass = size === "sm" ? "w-10 h-10" : size === "lg" ? "w-20 h-20" : "w-14 h-14";
  return (
    <div
      className={`radial-progress ${sizeClass} text-primary`}
      style={{ "--value": v }}
      role="img"
      aria-label={`Progress ${v}%`}
    >
      {label ? `${v}%` : null}
    </div>
  );
}
