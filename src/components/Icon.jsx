export function Icon({ name, className = "w-4 h-4" }) {
  const path = {
    page: "M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 0v5h5",
    attachment: "M7 13a5 5 0 0 0 10 0V6a3 3 0 1 0-6 0v7a1 1 0 0 0 2 0V6",
    quiz: "M9 7h8M9 11h8M9 15h6M6 7h.01M6 11h.01M6 15h.01",
    note: "M8 4h8M8 8h8M8 12h6M6 20l3-3",
    video: "M5 5h10v10H5z M15 10l6 3V7z",
    more: "M5 12h.01M12 12h.01M19 12h.01",
    time: "M12 8v5l3 2M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18z",
    points: "M12 2l2.39 4.84L20 8l-4 3.9L17 18l-5-2.6L7 18l1-6.1L4 8l5.61-1.16L12 2z",
    search: "M11 19a8 8 0 1 1 5.657-13.657A8 8 0 0 1 11 19zm10 3-4.35-4.35",
    plus: "M12 5v14M5 12h14",
  }[name];
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={path} />
    </svg>
  );
}
