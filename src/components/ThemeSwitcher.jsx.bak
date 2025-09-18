// src/components/ThemeSwitcher.jsx
import { useEffect, useState } from "react";

const THEME_KEY = "app.theme";
const TEX_KEY = "app.texture";

const THEME_OPTIONS = [
  // include any other themes you already have
  "paper-notebook","paper-notebook-dark",
  "parchment","parchment-dark",
  "newsprint","newsprint-dark",
  "blueprint","blueprint-dark",
  "manila","manila-dark",
  "moleskine","moleskine-dark",
  "light","dark", // fallback DaisyUI themes if you keep them
];

const TEXTURE_OPTIONS = [
  { id: "none", label: "No texture" },
  { id: "paper", label: "Paper (grain)" },
  { id: "ruled", label: "Ruled (notebook)" },
  { id: "dot", label: "Dot grid" },
  { id: "linen", label: "Linen" },
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(
    localStorage.getItem(THEME_KEY) || "paper-notebook"
  );
  const [texture, setTexture] = useState(
    localStorage.getItem(TEX_KEY) || "paper"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const cls = document.body.classList;
    // remove any previous texture classes
    ["bg-texture-paper","bg-texture-ruled","bg-texture-dot","bg-texture-linen"].forEach(c => cls.remove(c));
    if (texture !== "none") cls.add(`bg-texture-${texture}`);
    localStorage.setItem(TEX_KEY, texture);
  }, [texture]);

  return (
    <div className="flex items-center gap-2">
      {/* Theme select */}
      <select
        className="select select-sm select-bordered"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        title="Theme"
      >
        {THEME_OPTIONS.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      {/* Texture select */}
      <select
        className="select select-sm select-bordered"
        value={texture}
        onChange={(e) => setTexture(e.target.value)}
        title="Background texture"
      >
        {TEXTURE_OPTIONS.map((t) => (
          <option key={t.id} value={t.id}>{t.label}</option>
        ))}
      </select>
    </div>
  );
}
