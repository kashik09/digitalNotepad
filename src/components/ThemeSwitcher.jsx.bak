import { useEffect, useMemo, useState } from "react";

const THEME_SETS = {
  cyber: ["cyber-neon", "cyber-terminal", "cyber-indigo", "cyber-light"],
  software: ["dev-slate", "dev-ocean", "dev-sand", "dev-mono"],
};

const DARK_SETS = {
  cyber: new Set(["cyber-neon", "cyber-terminal", "cyber-indigo"]),
  software: new Set(["dev-slate", "dev-ocean"]),
};

const LIGHT_SETS = {
  cyber: new Set(["cyber-light"]),
  software: new Set(["dev-sand", "dev-mono"]),
};

function getSubjectFromHash() {
  const h = (window.location.hash || "").toLowerCase();
  if (h.startsWith("#/software")) return "software";
  return "cyber";
}

function shortLabel(name = "") {
  return name.replace(/^cyber-/, "").replace(/^dev-/, "");
}

export default function ThemeSwitcher() {
  const [subject, setSubject] = useState(getSubjectFromHash());
  const [mode, setMode] = useState(localStorage.getItem("MODE:active") || "dark");

  const savedTheme = useMemo(() => {
    const key = `THEME:${subject}`;
    return localStorage.getItem(key) || (subject === "cyber" ? "cyber-neon" : "dev-slate");
  }, [subject]);

  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    const onHash = () => setSubject(getSubjectFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const key = `THEME:${subject}`;
    const t = localStorage.getItem(key) || (subject === "cyber" ? "cyber-neon" : "dev-slate");
    setTheme(t);
  }, [subject]);

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem(`THEME:${subject}`, theme);
      localStorage.setItem("THEME:active", theme);
    } catch {}
  }, [theme, subject]);

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-mode", mode);
      localStorage.setItem("MODE:active", mode);
    } catch {}
  }, [mode]);

  function handleMode(next) {
    if (next === mode) return;
    setMode(next);

    const isDark = DARK_SETS[subject].has(theme);
    const isLight = LIGHT_SETS[subject].has(theme);

    if (next === "light" && isDark) {
      const lastLight = localStorage.getItem(`LAST_LIGHT:${subject}`);
      const fallback = [...LIGHT_SETS[subject]][0];
      const candidate = lastLight && LIGHT_SETS[subject].has(lastLight) ? lastLight : fallback;
      localStorage.setItem(`LAST_DARK:${subject}`, theme);
      setTheme(candidate);
      return;
    }
    if (next === "dark" && isLight) {
      const lastDark = localStorage.getItem(`LAST_DARK:${subject}`);
      const fallback = [...DARK_SETS[subject]][0];
      const candidate = lastDark && DARK_SETS[subject].has(lastDark) ? lastDark : fallback;
      localStorage.setItem(`LAST_LIGHT:${subject}`, theme);
      setTheme(candidate);
      return;
    }
  }

  const themeOptions = THEME_SETS[subject];

  return (
    <div className="card bg-base-200/60 border border-base-300 shadow-sm backdrop-blur-sm">
      <div className="card-body py-2 px-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode toggle (independent of theme) */}
          <div className="join">
            <button
              className={`btn btn-xs sm:btn-sm join-item ${mode === "light" ? "btn-active" : "btn-ghost"}`}
              onClick={() => handleMode("light")}
              aria-pressed={mode === "light"}
            >
              ☀️ Light
            </button>
            <button
              className={`btn btn-xs sm:btn-sm join-item ${mode === "dark" ? "btn-active" : "btn-ghost"}`}
              onClick={() => handleMode("dark")}
              aria-pressed={mode === "dark"}
            >
              🌙 Dark
            </button>
          </div>

          {/* Subject label */}
          <span className="badge badge-outline hidden sm:inline-flex">
            {subject === "cyber" ? "Cyber" : "Software"}
          </span>

          {/* Theme dropdown (cyber-styled) */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-xs sm:btn-sm btn-ghost border border-base-300/60"
              aria-haspopup="listbox"
              aria-label="Change theme"
              title="Change theme"
            >
              🎨 {shortLabel(theme)}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[60] menu p-2 shadow-lg bg-base-200 border border-base-300 rounded-xl w-56"
              role="listbox"
            >
              {themeOptions.map((t) => {
                const isActive = t === theme;
                const tag = DARK_SETS[subject].has(t)
                  ? "dark"
                  : LIGHT_SETS[subject].has(t)
                  ? "light"
                  : "";
                return (
                  <li key={t}>
                    <button
                      role="option"
                      aria-selected={isActive}
                      className={isActive ? "active" : ""}
                      onClick={() => setTheme(t)}
                    >
                      <span className="truncate">{shortLabel(t)}</span>
                      {tag && <span className="badge badge-ghost ml-2">{tag}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
