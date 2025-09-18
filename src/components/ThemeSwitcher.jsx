import { useEffect, useMemo, useState } from "react";

const SUBJECTS = ["cyber", "software"];

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

export default function ThemeSwitcher() {
  const [subject, setSubject] = useState(getSubjectFromHash());
  const [mode, setMode] = useState(localStorage.getItem("MODE:active") || "dark");

  // subject-scoped theme preference
  const savedTheme = useMemo(() => {
    const key = `THEME:${subject}`;
    return localStorage.getItem(key) || (subject === "cyber" ? "cyber-neon" : "dev-slate");
  }, [subject]);

  const [theme, setTheme] = useState(savedTheme);

  // keep subject in sync with URL (hash router)
  useEffect(() => {
    const onHash = () => setSubject(getSubjectFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // hydrate on subject change
  useEffect(() => {
    const key = `THEME:${subject}`;
    const t = localStorage.getItem(key) || (subject === "cyber" ? "cyber-neon" : "dev-slate");
    setTheme(t);
    // do not force mode; keep global mode
  }, [subject]);

  // apply theme+mode to <html> and persist
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

  // when toggling mode, if current theme doesn't match, swap to a sensible default
  function handleMode(next) {
    if (next === mode) return;
    setMode(next);

    const isDark = DARK_SETS[subject].has(theme);
    const isLight = LIGHT_SETS[subject].has(theme);

    if (next === "light" && isDark) {
      const lastLight = localStorage.getItem(`LAST_LIGHT:${subject}`);
      const fallback = [...LIGHT_SETS[subject]][0];
      const candidate = lastLight && LIGHT_SETS[subject].has(lastLight) ? lastLight : fallback;
      // remember last dark
      localStorage.setItem(`LAST_DARK:${subject}`, theme);
      setTheme(candidate);
      return;
    }
    if (next === "dark" && isLight) {
      const lastDark = localStorage.getItem(`LAST_DARK:${subject}`);
      const fallback = [...DARK_SETS[subject]][0];
      const candidate = lastDark && DARK_SETS[subject].has(lastDark) ? lastDark : fallback;
      // remember last light
      localStorage.setItem(`LAST_LIGHT:${subject}`, theme);
      setTheme(candidate);
      return;
    }
    // if current theme already matches the mode set, keep it
  }

  const themeOptions = THEME_SETS[subject];

  return (
    <div className="card bg-base-200/60 border border-base-300 shadow-sm">
      <div className="card-body py-2 px-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode toggle */}
          <div className="join">
            <button
              className={`btn btn-xs sm:btn-sm join-item ${mode === "light" ? "btn-active" : "btn-ghost"}`}
              onClick={() => handleMode("light")}
              aria-pressed={mode === "light"}
            >
              Light
            </button>
            <button
              className={`btn btn-xs sm:btn-sm join-item ${mode === "dark" ? "btn-active" : "btn-ghost"}`}
              onClick={() => handleMode("dark")}
              aria-pressed={mode === "dark"}
            >
              Dark
            </button>
          </div>

          {/* Theme picker */}
          <select
            className="select select-bordered select-xs sm:select-sm min-w-[12rem]"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            aria-label="Theme"
            title="Theme"
          >
            {themeOptions.map((t) => {
              const tag = DARK_SETS[subject].has(t) ? " (dark)" : LIGHT_SETS[subject].has(t) ? " (light)" : "";
              return (
                <option key={t} value={t}>
                  {t}{tag}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
