import { useEffect, useMemo, useState } from "react";

/** Dark theme choices only (clean list) */
const CYBER_DARK = ["cyber-neon", "cyber-terminal", "cyber-indigo"];
const SOFTWARE_DARK = ["dev-slate", "dev-ocean"];

/** What to apply when user toggles Light mode */
const LIGHT_COMPANION = {
  cyber: "cyber-light",
  software: "dev-sand",
  hub: "cyber-light",
};

function subjectFromHash() {
  const h = (window.location.hash || "").toLowerCase();
  if (h.startsWith("#/software")) return "software";
  if (h.startsWith("#/cyber") || h.startsWith("#/phase/")) return "cyber";
  return "hub";
}

function setTheme(theme) {
  if (!theme) return;
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem("THEME:active", theme); } catch {}
}

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(() => localStorage.getItem("MODE:active") || "dark");
  const subject = subjectFromHash();

  const darkList = useMemo(() => {
    if (subject === "software") return SOFTWARE_DARK;
    if (subject === "cyber") return CYBER_DARK;
    return [...CYBER_DARK.slice(0,2), ...SOFTWARE_DARK.slice(0,1)];
  }, [subject]);

  const currentTheme =
    document.documentElement.getAttribute("data-theme") ||
    localStorage.getItem("THEME:active") ||
    (subject === "software" ? SOFTWARE_DARK[0] : CYBER_DARK[0]);

  /** Load stored dark pick per subject */
  function getStoredDark() {
    try { return localStorage.getItem(`THEME_DARK:${subject}`); } catch {}
    return null;
  }
  function setStoredDark(t) {
    try { localStorage.setItem(`THEME_DARK:${subject}`, t); } catch {}
  }

  /** Apply correct theme whenever mode/subject changes */
  useEffect(() => {
    try { localStorage.setItem("MODE:active", mode); } catch {}
    if (mode === "light") {
      const comp = LIGHT_COMPANION[subject] || LIGHT_COMPANION.hub;
      setTheme(comp);
    } else {
      const pick = getStoredDark() || darkList[0];
      setTheme(pick);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, subject]);

  // close on navigation
  useEffect(() => {
    const onHash = () => setOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="dropdown dropdown-end">
      <button
        className="btn btn-sm btn-ghost border border-base-300/60"
        onClick={() => setOpen((v) => !v)}
      >
        🎨 {currentTheme?.replace(/^cyber-|^dev-/, "")}
      </button>

      {open && (
        <div className="dropdown-content z-[60] mt-2 p-3 w-64 rounded-xl border border-base-300 bg-base-100 shadow-xl">
          {/* Light / Dark toggle */}
          <div className="join w-full mb-3">
            <button
              className={`btn btn-xs join-item ${mode === "light" ? "btn-active" : "btn-ghost"}`}
              onClick={() => setMode("light")}
            >☀️ Light</button>
            <button
              className={`btn btn-xs join-item ${mode === "dark" ? "btn-active" : "btn-ghost"}`}
              onClick={() => setMode("dark")}
            >🌙 Dark</button>
          </div>

          {/* subject hint */}
          <div className="badge badge-outline mb-2">
            {subject === "software" ? "Software" : subject === "cyber" ? "Cyber" : "Hub"}
          </div>

          {/* Dark themes list only; when in Light mode, we remember choice for the next time user flips back to Dark */}
          <ul className="menu w-full max-h-64 overflow-auto">
            {darkList.map((t) => {
              const active = t === currentTheme && mode === "dark";
              return (
                <li key={t}>
                  <button
                    className={`justify-between ${active ? "active" : ""}`}
                    onClick={() => {
                      setStoredDark(t);
                      if (mode === "dark") setTheme(t);
                      setOpen(false);
                    }}
                  >
                    <span>{t.replace(/^cyber-|^dev-/, "")}</span>
                    {active && <span className="badge badge-sm">selected</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
