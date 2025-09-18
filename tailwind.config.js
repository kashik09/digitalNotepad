/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  darkMode: ["class", '[data-theme="dark"]'],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      // built-ins (both light/dark pairs)
      "light","dark","cupcake","bumblebee","emerald","corporate",
      "synthwave","retro","cyberpunk","valentine","halloween","forest",
      "aqua","lofi","pastel","fantasy","wireframe","black","luxury","dracula",
      "cmyk","autumn","business","acid","lemonade","night","coffee","winter",
      // Custom starter themes
      {
        oceanic: {
          primary: "#0ea5e9", secondary: "#22d3ee", accent: "#10b981",
          neutral: "#1f2937", "base-100": "#0b1220", info: "#38bdf8",
          success: "#22c55e", warning: "#f59e0b", error: "#ef4444",
        },
      },
      {
        paper: {
          primary: "#0f172a", secondary: "#1e293b", accent: "#334155",
          neutral: "#111827", "base-100": "#fafaf9", info: "#0284c7",
          success: "#16a34a", warning: "#b45309", error: "#dc2626",
        },
      },
    ],
  },
};
