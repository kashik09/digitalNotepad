import { useState } from "react";
import { useTheme } from "../theme/ThemeProvider";

const PRESETS = [
  "light","dark","night","winter","emerald","synthwave","forest","dracula",
  "oceanic","paper","business","coffee","cyberpunk","retro","luxury",
];

export default function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const [customName, setCustomName] = useState("mytheme");
  const [h, setH] = useState(220);
  const [s, setS] = useState(80);
  const [l, setL] = useState(50);

  function applyCustom() {
    const hex = (h, s, l) => {
      // hsl to hex (tiny helper)
      s /= 100; l /= 100;
      const k = n => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      const toHex = x => Math.round(255 * x).toString(16).padStart(2, "0");
      return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
    };

    const base = hex(h, s, l);
    const primary = base;
    const secondary = hex((h+40)%360, s, Math.min(l+10, 90));
    const accent = hex((h+80)%360, Math.min(s+5, 95), l);
    const themeObj = {
      [customName]: {
        primary, secondary, accent,
        neutral: "#1f2937",
        "base-100": l > 55 ? "#0b1220" : "#f8fafc",
        info: "#38bdf8", success: "#22c55e", warning: "#f59e0b", error: "#ef4444",
      },
    };
    // inject to daisyUI at runtime
    const ev = new CustomEvent("daisyui:update", { detail: { themes: themeObj } });
    window.dispatchEvent(ev);
    document.documentElement.setAttribute("data-theme", customName);
    setTheme(customName);
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="select select-sm select-bordered"
        aria-label="Theme"
      >
        {PRESETS.map(t => <option key={t} value={t}>{t}</option>)}
      </select>

      {/* custom builder */}
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-sm">Build theme</label>
        <div tabIndex={0} className="dropdown-content card card-compact bg-base-100 p-3 shadow-xl w-72 space-y-2">
          <div className="font-medium">Custom theme (HSL)</div>
          <div className="flex items-center gap-2">
            <span className="w-16 text-xs">Name</span>
            <input className="input input-sm input-bordered w-full" value={customName} onChange={(e)=>setCustomName(e.target.value)}/>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-16 text-xs">Hue</span>
            <input type="range" min={0} max={359} value={h} onChange={(e)=>setH(+e.target.value)} className="range range-xs flex-1"/>
            <span className="w-10 text-right text-xs">{h}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-16 text-xs">Sat</span>
            <input type="range" min={0} max={100} value={s} onChange={(e)=>setS(+e.target.value)} className="range range-xs flex-1"/>
            <span className="w-10 text-right text-xs">{s}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-16 text-xs">Light</span>
            <input type="range" min={0} max={100} value={l} onChange={(e)=>setL(+e.target.value)} className="range range-xs flex-1"/>
            <span className="w-10 text-right text-xs">{l}%</span>
          </div>
          <button onClick={applyCustom} className="btn btn-primary btn-sm w-full">Apply</button>
        </div>
      </div>
    </div>
  );
}
