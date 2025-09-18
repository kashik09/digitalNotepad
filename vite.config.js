// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ⬅️ Set this to your repo name EXACTLY as on GitHub
const repoName = "digitalNotepad";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // For GitHub Pages project sites: /<repo>/
  // For local dev: /
  base: mode === "production" ? `/${repoName}/` : "/",
}));
