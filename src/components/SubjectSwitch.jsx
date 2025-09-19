export default function SubjectSwitch() {
  function go(target) {
    if (target === "hub") window.location.hash = "#/";
    else if (target === "cyber") window.location.hash = "#/cyber";
    else if (target === "software") window.location.hash = "#/software";
  }

  const h = (window.location.hash || "").toLowerCase();
  const atHub = h === "#/" || h === "" || h === "#";
  const atSoftware = h.startsWith("#/software");
  const atCyber = h.startsWith("#/cyber") || h.startsWith("#/phase/");

  return (
    <div className="join">
      <button
        className={`btn btn-xs sm:btn-sm join-item ${atHub ? "btn-active" : "btn-ghost"}`}
        onClick={() => go("hub")}
        aria-pressed={atHub}
        title="Hub"
      >
        Hub
      </button>
      <button
        className={`btn btn-xs sm:btn-sm join-item ${atCyber ? "btn-active" : "btn-ghost"}`}
        onClick={() => go("cyber")}
        aria-pressed={atCyber}
        title="Cybersecurity"
      >
        Cyber
      </button>
      <button
        className={`btn btn-xs sm:btn-sm join-item ${atSoftware ? "btn-active" : "btn-ghost"}`}
        onClick={() => go("software")}
        aria-pressed={atSoftware}
        title="Software Dev"
      >
        Dev
      </button>
    </div>
  );
}
