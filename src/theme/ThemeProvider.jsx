import { useEffect } from "react";

const DEFAULTS = {
  themeBySubject: {
    cyber: "cyber-neon",
    software: "dev-slate",
  },
  mode: "dark", // "light" | "dark"
};

function subjectFromHash() {
  const h = (window.location.hash || "").toLowerCase();
  if (h.startsWith("#/software")) return "software";
  if (h.startsWith("#/cyber") || h.startsWith("#/phase/")) return "cyber";
  // Hub or unknown → keep last active subject's theme
  return null;
}

function applyTheme(theme, mode) {
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("THEME:active", theme);
    } catch {}
  }
  if (mode) {
    document.documentElement.setAttribute("data-mode", mode);
    try {
      localStorage.setItem("MODE:active", mode);
    } catch {}
  }
}

export default function ThemeProvider({ children }) {
  // Initial hydrate: pick THEME for current subject (if any) + MODE
  useEffect(() => {
    try {
      const mode = localStorage.getItem("MODE:active") || DEFAULTS.mode;
      const subject = subjectFromHash();
      if (subject) {
        const key = `THEME:${subject}`;
        const saved = localStorage.getItem(key) || DEFAULTS.themeBySubject[subject];
        applyTheme(saved, mode);
      } else {
        // no subject in URL — fall back to last active theme if any
        const active = localStorage.getItem("THEME:active");
        const fallback = DEFAULTS.themeBySubject.cyber;
        applyTheme(active || fallback, mode);
      }
    } catch {
      applyTheme(DEFAULTS.themeBySubject.cyber, DEFAULTS.mode);
    }
  }, []);

  // Listen for subject switches via hashchange and apply that subject's theme
  useEffect(() => {
    function onHash() {
      const subject = subjectFromHash();
      if (!subject) return;
      try {
        const mode = localStorage.getItem("MODE:active") || DEFAULTS.mode;
        const key = `THEME:${subject}`;
        const saved = localStorage.getItem(key) || DEFAULTS.themeBySubject[subject];
        applyTheme(saved, mode);
      } catch {
        applyTheme(DEFAULTS.themeBySubject.cyber, DEFAULTS.mode);
      }
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return children;
}
