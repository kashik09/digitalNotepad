'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const DEFAULTS = {
  themeBySubject: {
    cyber: "cyber-neon",
    software: "dev-slate",
  },
  mode: "dark", // "light" | "dark"
};

function subjectFromPath(path) {
  if (!path) return null;
  const p = path.toLowerCase();
  if (p.startsWith("/software")) return "software";
  if (p.startsWith("/cyber") || p.startsWith("/phase/")) return "cyber";
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
  const pathname = usePathname();

  // Initial hydrate: pick THEME for current subject (if any) + MODE
  useEffect(() => {
    try {
      const mode = localStorage.getItem("MODE:active") || DEFAULTS.mode;
      const subject = subjectFromPath(pathname);
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
  }, [pathname]);

  return children;
}
