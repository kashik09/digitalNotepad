// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      /* ============================
       * PAPER NOTEBOOK (cream paper, blue ink)
       * ============================ */
      {
        "paper-notebook": {
          primary: "#2F5DCC",
          "primary-content": "#ffffff",
          secondary: "#C13B2A",
          "secondary-content": "#ffffff",
          accent: "#2E7D66",
          "accent-content": "#ffffff",
          neutral: "#6B7280",
          "neutral-content": "#ffffff",
          "base-100": "#FAF7F2",
          "base-200": "#F2ECE5",
          "base-300": "#E8E2DA",
          "base-content": "#1F2937",
          info: "#0EA5E9",
          success: "#16A34A",
          warning: "#B45309",
          error: "#B91C1C",
        },
      },
      {
        "paper-notebook-dark": {
          primary: "#8FB3FF",
          "primary-content": "#0B1220",
          secondary: "#FF8A80",
          "secondary-content": "#1A0B0B",
          accent: "#7AD1B8",
          "accent-content": "#0B1412",
          neutral: "#9CA3AF",
          "neutral-content": "#111827",
          "base-100": "#111315",
          "base-200": "#0D0F10",
          "base-300": "#1A1D1F",
          "base-content": "#E5E7EB",
          info: "#38BDF8",
          success: "#22C55E",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },

      /* ============================
       * PARCHMENT (warm parchment)
       * ============================ */
      {
        parchment: {
          primary: "#7A5C2E",
          "primary-content": "#FFF7ED",
          secondary: "#A25D2A",
          "secondary-content": "#FFF7ED",
          accent: "#6A994E",
          "accent-content": "#0E1B10",
          neutral: "#5F6B6B",
          "neutral-content": "#F7F7F5",
          "base-100": "#FBF4E8",
          "base-200": "#F3E8D8",
          "base-300": "#E8D9C3",
          "base-content": "#2B2B2B",
          info: "#2563EB",
          success: "#2F855A",
          warning: "#B7791F",
          error: "#B83224",
        },
      },
      {
        "parchment-dark": {
          primary: "#D0A87A",
          "primary-content": "#1A130A",
          secondary: "#E3B485",
          "secondary-content": "#1A1208",
          accent: "#9BD193",
          "accent-content": "#0D150D",
          neutral: "#A3A3A3",
          "neutral-content": "#111111",
          "base-100": "#15110C",
          "base-200": "#1A150E",
          "base-300": "#221C13",
          "base-content": "#F1E7D8",
          info: "#60A5FA",
          success: "#34D399",
          warning: "#FBBF24",
          error: "#F87171",
        },
      },

      /* ============================
       * NEWSPRINT (cool gray paper)
       * ============================ */
      {
        newsprint: {
          primary: "#004B8D",
          "primary-content": "#ffffff",
          secondary: "#D00000",
          "secondary-content": "#ffffff",
          accent: "#008E5B",
          "accent-content": "#ffffff",
          neutral: "#5B5B5B",
          "neutral-content": "#ffffff",
          "base-100": "#F7F7F2",
          "base-200": "#ECECE6",
          "base-300": "#E3E3DC",
          "base-content": "#1C1C1C",
          info: "#0284C7",
          success: "#15803D",
          warning: "#A16207",
          error: "#B91C1C",
        },
      },
      {
        "newsprint-dark": {
          primary: "#67A6FF",
          "primary-content": "#0B1220",
          secondary: "#FF6B6B",
          "secondary-content": "#1B0B0B",
          accent: "#66D1A7",
          "accent-content": "#0B1412",
          neutral: "#A1A1AA",
          "neutral-content": "#111827",
          "base-100": "#0F1112",
          "base-200": "#131516",
          "base-300": "#1C1F20",
          "base-content": "#EDEDE7",
          info: "#38BDF8",
          success: "#22C55E",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },

      /* ============================
       * BLUEPRINT (studio pad)
       * ============================ */
      {
        blueprint: {
          primary: "#1E40AF",
          "primary-content": "#E5EDFF",
          secondary: "#475569",
          "secondary-content": "#E2E8F0",
          accent: "#0891B2",
          "accent-content": "#E0F2FE",
          neutral: "#64748B",
          "neutral-content": "#F8FAFC",
          "base-100": "#EEF5FF",
          "base-200": "#E4EEFE",
          "base-300": "#D8E3F6",
          "base-content": "#1C2738",
          info: "#0EA5E9",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
      {
        "blueprint-dark": {
          primary: "#60A5FA",
          "primary-content": "#0A1225",
          secondary: "#94A3B8",
          "secondary-content": "#0C111A",
          accent: "#22D3EE",
          "accent-content": "#07161A",
          neutral: "#94A3B8",
          "neutral-content": "#0B1020",
          "base-100": "#0B1529",
          "base-200": "#091020",
          "base-300": "#0E1A30",
          "base-content": "#E2E8F0",
          info: "#38BDF8",
          success: "#34D399",
          warning: "#FBBF24",
          error: "#F87171",
        },
      },

      /* ============================
       * MANILA (folder vibes)
       * ============================ */
      {
        manila: {
          primary: "#B7791F",
          "primary-content": "#FFF7E6",
          secondary: "#7C3AED",
          "secondary-content": "#F5F3FF",
          accent: "#059669",
          "accent-content": "#E6FFFA",
          neutral: "#6B5E52",
          "neutral-content": "#FFF7E6",
          "base-100": "#FFF7E8",
          "base-200": "#FCEED7",
          "base-300": "#F2E3C7",
          "base-content": "#2F2A1F",
          info: "#0EA5E9",
          success: "#16A34A",
          warning: "#D97706",
          error: "#DC2626",
        },
      },
      {
        "manila-dark": {
          primary: "#FBBF24",
          "primary-content": "#171307",
          secondary: "#C4B5FD",
          "secondary-content": "#120F1A",
          accent: "#34D399",
          "accent-content": "#0A1512",
          neutral: "#A8A29E",
          "neutral-content": "#111110",
          "base-100": "#12100C",
          "base-200": "#1A1712",
          "base-300": "#232017",
          "base-content": "#F5EADA",
          info: "#60A5FA",
          success: "#22C55E",
          warning: "#F59E0B",
          error: "#F87171",
        },
      },

      /* ============================
       * MOLESKINE (notebook cover)
       * ============================ */
      {
        moleskine: {
          primary: "#B91C1C",            // red ribbon
          "primary-content": "#FFF1F2",
          secondary: "#44403C",          // elastic band grey
          "secondary-content": "#F5F5F4",
          accent: "#2563EB",
          "accent-content": "#EFF6FF",
          neutral: "#78716C",
          "neutral-content": "#F5F5F4",
          "base-100": "#F0EDE7",
          "base-200": "#E8E4DD",
          "base-300": "#DED9D0",
          "base-content": "#1C1B1A",
          info: "#0284C7",
          success: "#16A34A",
          warning: "#B45309",
          error: "#B91C1C",
        },
      },
      {
        "moleskine-dark": {
          primary: "#EF4444",
          "primary-content": "#190A0A",
          secondary: "#A8A29E",
          "secondary-content": "#111111",
          accent: "#93C5FD",
          "accent-content": "#0A111A",
          neutral: "#9A918B",
          "neutral-content": "#0E0D0C",
          "base-100": "#0C0B0A",
          "base-200": "#141311",
          "base-300": "#1C1B19",
          "base-content": "#E7E5E4",
          info: "#38BDF8",
          success: "#22C55E",
          warning: "#F59E0B",
          error: "#F87171",
        },
      },
    ],
  },
};
