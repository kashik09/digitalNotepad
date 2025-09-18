import { useEffect } from "react";

const DEFAULTS = {
  theme: "cyber-neon",
  mode: "dark", // "light" | "dark"
};

export default function ThemeProvider({ children }) {
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("THEME:active") || DEFAULTS.theme;
      const savedMode = localStorage.getItem("MODE:active") || DEFAULTS.mode;
      document.documentElement.setAttribute("data-theme", savedTheme);
      document.documentElement.setAttribute("data-mode", savedMode);
    } catch {}
  }, []);

  return children;
}
