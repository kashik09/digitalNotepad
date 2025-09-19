/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: false,
    themes: [
      /* ===== CYBER (dark) ===== */
      { "cyber-neon":     { "color-scheme":"dark", primary:"#22d3ee", secondary:"#a78bfa", accent:"#f472b6", neutral:"#0b1220", "base-100":"#0f172a", "base-200":"#0b1220", "base-300":"#1f2937", "base-content":"#e5e7eb", info:"#38bdf8", success:"#22c55e", warning:"#f59e0b", error:"#ef4444" } },
      { "cyber-terminal": { "color-scheme":"dark", primary:"#10b981", secondary:"#22d3ee", accent:"#a7f3d0", neutral:"#0a0f0a", "base-100":"#0a0f0a", "base-200":"#0f172a", "base-300":"#1f2937", "base-content":"#e5e7eb", info:"#2dd4bf", success:"#16a34a", warning:"#f59e0b", error:"#ef4444" } },
      { "cyber-indigo":   { "color-scheme":"dark", primary:"#6366f1", secondary:"#22d3ee", accent:"#a78bfa", neutral:"#0b1020", "base-100":"#0b1020", "base-200":"#0f172a", "base-300":"#1f2937", "base-content":"#e5e7eb", info:"#60a5fa", success:"#34d399", warning:"#f59e0b", error:"#ef4444" } },

      /* ===== CYBER (light companions) ===== */
      { "cyber-neon-light":     { "color-scheme":"light", primary:"#0ea5e9", secondary:"#7c3aed", accent:"#ec4899", neutral:"#111827", "base-100":"#fafafa", "base-200":"#f3f4f6", "base-300":"#e5e7eb", "base-content":"#111827", info:"#0284c7", success:"#16a34a", warning:"#d97706", error:"#dc2626" } },
      { "cyber-terminal-light": { "color-scheme":"light", primary:"#059669", secondary:"#06b6d4", accent:"#34d399", neutral:"#111827", "base-100":"#f9fafb", "base-200":"#f3f4f6", "base-300":"#e5e7eb", "base-content":"#111827", info:"#0891b2", success:"#16a34a", warning:"#d97706", error:"#dc2626" } },
      { "cyber-indigo-light":   { "color-scheme":"light", primary:"#6366f1", secondary:"#06b6d4", accent:"#a78bfa", neutral:"#111827", "base-100":"#ffffff", "base-200":"#f3f4f6", "base-300":"#e5e7eb", "base-content":"#111827", info:"#3b82f6", success:"#22c55e", warning:"#f59e0b", error:"#ef4444" } },

      /* ===== SOFTWARE (dark) ===== */
      { "dev-slate": { "color-scheme":"dark", primary:"#60a5fa", secondary:"#94a3b8", accent:"#f59e0b", neutral:"#0b1220", "base-100":"#0f172a", "base-200":"#0b1220", "base-300":"#1f2937", "base-content":"#e5e7eb", info:"#38bdf8", success:"#22c55e", warning:"#eab308", error:"#ef4444" } },
      { "dev-ocean": { "color-scheme":"dark", primary:"#22d3ee", secondary:"#60a5fa", accent:"#34d399", neutral:"#071318", "base-100":"#08141a", "base-200":"#0b1720", "base-300":"#11202b", "base-content":"#e5e7eb", info:"#38bdf8", success:"#10b981", warning:"#f59e0b", error:"#ef4444" } },

      /* ===== SOFTWARE (light companions) ===== */
      { "dev-slate-light": { "color-scheme":"light", primary:"#2563eb", secondary:"#64748b", accent:"#d97706", neutral:"#111827", "base-100":"#f8fafc", "base-200":"#f1f5f9", "base-300":"#e2e8f0", "base-content":"#111827", info:"#0ea5e9", success:"#16a34a", warning:"#d97706", error:"#dc2626" } },
      { "dev-ocean-light": { "color-scheme":"light", primary:"#06b6d4", secondary:"#3b82f6", accent:"#22c55e", neutral:"#0f172a", "base-100":"#f0f9ff", "base-200":"#e0f2fe", "base-300":"#bfdbfe", "base-content":"#0f172a", info:"#0ea5e9", success:"#10b981", warning:"#f59e0b", error:"#ef4444" } },

      /* existing general-purpose lights (still available for mapping if needed) */
      { "cyber-light": { "color-scheme":"light", primary:"#0ea5e9", secondary:"#6366f1", accent:"#f472b6", neutral:"#111827", "base-100":"#fafafa", "base-200":"#f3f4f6", "base-300":"#e5e7eb", "base-content":"#111827", info:"#0284c7", success:"#16a34a", warning:"#d97706", error:"#dc2626" } },
      { "dev-sand":   { "color-scheme":"light", primary:"#0ea5e9", secondary:"#d4a373", accent:"#f59e0b", neutral:"#1f2937", "base-100":"#faf7f2", "base-200":"#efe6da", "base-300":"#e5dccf", "base-content":"#111827", info:"#0284c7", success:"#16a34a", warning:"#d97706", error:"#dc2626" } },
      { "dev-mono":   { "color-scheme":"light", primary:"#111827", secondary:"#6b7280", accent:"#374151", neutral:"#111827", "base-100":"#f9fafb", "base-200":"#f3f4f6", "base-300":"#e5e7eb", "base-content":"#111827", info:"#1f2937", success:"#065f46", warning:"#b45309", error:"#991b1b" } },
    ],
  },
};
