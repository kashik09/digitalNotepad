/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      // ==== CYBER (dark-leaning) ====
      {
        "cyber-neon": {
          "primary": "#00FFC6",
          "secondary": "#7C5CFF",
          "accent": "#00B3FF",
          "neutral": "#1B1B1F",
          "base-100": "#0E0E12",
          "info": "#00B3FF",
          "success": "#00D896",
          "warning": "#F2C34C",
          "error": "#FF5470",
        },
      },
      {
        "cyber-terminal": {
          "primary": "#00FF88",
          "secondary": "#29A36A",
          "accent": "#2DE2E6",
          "neutral": "#0B0F0F",
          "base-100": "#0A0E0E",
          "info": "#2DE2E6",
          "success": "#00FF88",
          "warning": "#FFD166",
          "error": "#FF6B6B",
        },
      },
      {
        "cyber-indigo": {
          "primary": "#8B5CF6",
          "secondary": "#22D3EE",
          "accent": "#22C55E",
          "neutral": "#0F1020",
          "base-100": "#0A0B1A",
          "info": "#60A5FA",
          "success": "#34D399",
          "warning": "#FBBF24",
          "error": "#F87171",
        },
      },
      // ==== CYBER (light-leaning) ====
      {
        "cyber-light": {
          "primary": "#4C1D95",
          "secondary": "#0EA5E9",
          "accent": "#16A34A",
          "neutral": "#111827",
          "base-100": "#F8FAFC",
          "info": "#0284C7",
          "success": "#16A34A",
          "warning": "#CA8A04",
          "error": "#DC2626",
        },
      },

      // ==== SOFTWARE DEV (dark-leaning) ====
      {
        "dev-slate": {
          "primary": "#38BDF8",
          "secondary": "#A78BFA",
          "accent": "#F472B6",
          "neutral": "#0F172A",
          "base-100": "#0B1220",
          "info": "#22D3EE",
          "success": "#34D399",
          "warning": "#EAB308",
          "error": "#F87171",
        },
      },
      {
        "dev-ocean": {
          "primary": "#22D3EE",
          "secondary": "#60A5FA",
          "accent": "#10B981",
          "neutral": "#0B1021",
          "base-100": "#0A0F1C",
          "info": "#38BDF8",
          "success": "#10B981",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
      // ==== SOFTWARE DEV (light-leaning) ====
      {
        "dev-sand": {
          "primary": "#7C3AED",
          "secondary": "#2563EB",
          "accent": "#059669",
          "neutral": "#111827",
          "base-100": "#FAF7F2",
          "info": "#2563EB",
          "success": "#059669",
          "warning": "#CA8A04",
          "error": "#DC2626",
        },
      },
      {
        "dev-mono": {
          "primary": "#111827",
          "secondary": "#374151",
          "accent": "#059669",
          "neutral": "#111827",
          "base-100": "#F4F4F5",
          "info": "#3B82F6",
          "success": "#10B981",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
    ],
  },
};
