import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

if (!window.location.hash || window.location.hash === "#") {
  window.location.replace("#/login");
}
createRoot(document.getElementById("root")).render(<App />);
