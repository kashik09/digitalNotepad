// src/components/ThemeSwitcher.jsx
import { useEffect, useMemo, useState } from "react";

const BUILT_INS = [
"paper-notebook", "paper-notebook-dark", "parchment", "parchment-dark", "newsprint", "newsprint-dark", "blueprint", "blueprint-dark", "manila", "manila-dark", "moleskine", "moleskine-dark", "custom" 
];

const LS_THEME_KEY = "app.theme";
const CUSTOM_THEME_KEY = "app.customTheme"; // store custom primary

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => localStorage.getItem(LS_THEME_KEY) || "light");
  const [customPrimary, setCustomPrimary] = useState(() => localStorage.getItem(CUSTOM_THEME_KEY) || "#4f46e5");

  const applyTheme = (t) => {
    document.documentElement.setAttribute("data-theme", t === "custom" ? "custom" : t);
    localStorage.setItem(LS_THEME_KEY, t);
    if (t === "custom") applyCustomPrimary(customPrimary);
  };

  const applyCustomPrimary = (hex) => {
    // create or update a style tag with data-theme="custom"
    let style = document.getElementById("custom-theme-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "custom-theme-style";
      document.head.appendChild(style);
    }
    style.textContent = `
      :root[data-theme="custom"] {
        --p: ${hex};
        --pc: #ffffff;
        --b1: #ffffff;
        --bc: #1f2937;
      }
    `;
    localStorage.setItem(CUSTOM_THEME_KEY, hex);
  };

  useEffect(() => {
    // on mount, apply saved theme
    applyTheme(theme);
  }, []);

  const isCustom = theme === "custom";

  return (
    <div className="flex items-center gap-2">
      <select
        className="select select-bordered select-sm"
        value={theme}
        onChange={(e) => { const t = e.target.value; setTheme(t); applyTheme(t); }}
        title="Theme"
      >
        {BUILT_INS.map((t) => <option key={t} value={t}>{t}</option>)}
        <option value="custom">custom</option>
      </select>

      {isCustom && (
        <label className="flex items-center gap-2 text-sm">
          <span className="opacity-70">Primary</span>
          <input
            type="color"
            value={customPrimary}
            onChange={(e) => { setCustomPrimary(e.target.value); applyCustomPrimary(e.target.value); }}
            className="w-8 h-8 p-0 border rounded"
            title="Pick primary color"
          />
        </label>
      )}
    </div>
  );
}
