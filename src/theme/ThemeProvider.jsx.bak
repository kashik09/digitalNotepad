import { createContext, useContext, useEffect, useState } from "react";

const ThemeCtx = createContext();
const THEME_KEY = "notes_theme_v1";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || "light");

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    // daisyUI looks at data-theme
    document.documentElement.setAttribute("data-theme", theme);
    // still honor "dark" class for Tailwind dark:
    if (theme === "dark" || theme === "night" || theme === "black" || theme === "dracula") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}
export const useTheme = () => useContext(ThemeCtx);
