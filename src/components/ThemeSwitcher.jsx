import { useEffect, useMemo, useState } from "react";

const SUBJECT_THEMES = {
  cyber: ["cyber-neon", "cyber-terminal", "cyber-indigo", "cyber-light"],
  software: ["dev-slate", "dev-ocean", "dev-sand", "dev-mono"],
};

function subjectFromHash() {
  const h = (window.location.hash || "").toLowerCase();
  if (h.startsWith("#/software")) return "software";
  if (h.startsWith("#/cyber") || h.startsWith("#/phase/")) return "cyber";
  return "hub";
}

function applyTheme(theme) {
  if (!theme) return;
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem("THEME:active", theme); } catch {}
  // also persist by subject if we can detect one
  const s = subjectFromHash();
  if (s === "cyber" || s === "software") {
    try { localStorage.setItem(`THEME:${s}`, theme); } catch {}
  }
}

function applyMode(mode) {
  if (!mode) return;
  document.documentElement.setAttribute("data-mode", mode);
  try { localStorage.setItem("MODE:active", mode); } catch {}
}

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(() => localStorage.getItem("MODE:active") || "dark");
  const subject = subjectFromHash();

  const themes = useMemo(() => {
    if (subject === "software") return SUBJECT_THEMES.software;
    if (subject === "cyber") return SUBJECT_THEMES.cyber;
    // hub: show a merged quick list
    return [...SUBJECT_THEMES.cyber.slice(0,2), ...SUBJECT_THEMES.software.slice(0,2)];
  }, [subject]);

  const currentTheme = document.documentElement.getAttribute("data-theme") ||
    localStorage.getItem("THEME:active") || themes[0];

  useEffect(() => {
    applyMode(mode);
  }, [mode]);

  // close on route change
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
        🎨 {currentTheme?.replace(/^cyber-|^dev-/, "") || "theme"}
      </button>

      {open && (
        <div className="dropdown-content z-[60] mt-2 p-3 w-64 rounded-xl border border-base-300 bg-base-100 shadow-xl">
          {/* mode toggle */}
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

          {/* subject chip (read-only) */}
          <div className="badge badge-outline mb-2">
            {subject === "software" ? "Software" : subject === "cyber" ? "Cyber" : "Hub"}
          </div>

          {/* theme list — NO per-theme 'dark' label anymore */}
          <ul className="menu w-full max-h-64 overflow-auto">
            {themes.map((t) => {
              const active = t === currentTheme;
              return (
                <li key={t}>
                  <button
                    className={`justify-between ${active ? "active" : ""}`}
                    onClick={() => { applyTheme(t); setOpen(false); }}
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
