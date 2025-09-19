export default function AppTile({ icon="🧩", label, onClick, href }) {
  const Box = (
    <div className="w-28 h-28 sm:w-36 sm:h-36 grid place-items-center rounded-2xl bg-base-200 border border-base-300 shadow-[0_10px_0_0_var(--tw-shadow-color)] [--tw-shadow-color:theme(colors.base-300)] transition-transform active:translate-y-1 hover:translate-y-0.5 select-none">
      <span className="text-4xl" aria-hidden>{icon}</span>
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
