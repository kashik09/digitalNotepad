import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Normalize hash for HashRouter so first paint isn't blank at / or /digitalNotepad/
if (!window.location.hash || window.location.hash === "#") {
  window.location.replace("#/");
}

const el = document.getElementById("root");
if (!el) {
  console.error("Root element #root not found");
} else {
  console.log("[mount] booting app…", window.location.href);
  createRoot(el).render(<App />);
}
