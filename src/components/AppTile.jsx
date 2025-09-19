import { useRef } from "react";

export default function AppTile({ icon = "🧩", label, onClick, href }) {
  const ref = useRef(null);

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotX = (-dy * 6).toFixed(2);
    const rotY = (dx * 6).toFixed(2);
    el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }

  const Box = (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group w-28 h-28 sm:w-36 sm:h-36 grid place-items-center rounded-2xl bg-base-200 border border-base-300 shadow-[0_12px_0_0_var(--tw-shadow-color)] [--tw-shadow-color:theme(colors.base-300)] transition-transform active:translate-y-1 hover:translate-y-0.5 relative overflow-hidden"
    >
      <span className="text-4xl transition-transform group-active:scale-95" aria-hidden>{icon}</span>
      {/* subtle shine */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
  const Caption = <span className="text-sm sm:text-base font-medium mt-2">{label}</span>;

  if (href) {
    return (
      <a className="flex flex-col items-center focus:outline-none" href={href} target="_blank" rel="noreferrer">
        {Box}
        {Caption}
      </a>
    );
  }
  return (
    <button className="flex flex-col items-center focus:outline-none" onClick={onClick}>
      {Box}
      {Caption}
    </button>
  );
}
