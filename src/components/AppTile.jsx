import { useRef } from "react";

export default function AppTile({ icon = "🧩", label, onClick, href }) {
  const ref = useRef(null);
  function onMove(e) {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width/2)) / (r.width/2);
    const dy = (e.clientY - (r.top + r.height/2)) / (r.height/2);
    el.style.transform = `rotateX(${(-dy*6).toFixed(2)}deg) rotateY(${(dx*6).toFixed(2)}deg) translateY(-2px)`;
  }
  function onLeave(){ const el=ref.current; if(el) el.style.transform=""; }

  const Box = (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group w-24 h-24 sm:w-32 sm:h-32 grid place-items-center rounded-2xl bg-base-200 border border-base-300 shadow-[0_10px_0_0_var(--tw-shadow-color)] [--tw-shadow-color:theme(colors.base-300)] transition-transform active:translate-y-1 hover:translate-y-0.5 relative overflow-hidden"
    >
      <span className="text-3xl sm:text-4xl transition-transform group-active:scale-95" aria-hidden>{icon}</span>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
  const Caption = <span className="text-sm sm:text-base font-medium mt-2 text-center">{label}</span>;

  if (href) {
    return (
      <a className="flex flex-col items-center focus:outline-none" href={href} target="_blank" rel="noreferrer">
        {Box}{Caption}
      </a>
    );
  }
  return (
    <button className="flex flex-col items-center focus:outline-none" onClick={onClick}>
      {Box}{Caption}
    </button>
  );
}
