import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Use: GH_PAGES=1 npm run build  -> base '/digitalNotepad/'
// Local dev (npm run dev)        -> base '/'
const isGhPages = process.env.GH_PAGES === "1";

export default defineConfig({
  plugins: [react()],
  base: isGhPages ? "/digitalNotepad/" : "/",
});
