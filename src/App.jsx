import DataMenu from "./components/DataMenu.jsx";
import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "./theme/ThemeProvider.jsx";
import ThemeSwitcher from "./components/ThemeSwitcher.jsx";
import Hub from "./pages/Hub.jsx";
import HomeHub from "./pages/HomeHub.jsx";
import SoftwareApp from "./pages/SoftwareApp.jsx";
import ModuleView from "./pages/ModuleView.jsx";

function subjectFromHash() {
  const h = (window.location.hash || "").toLowerCase();
  if (h.startsWith("#/software")) return "Software";
  // module routes like #/phase/... are Cyber
  if (h.startsWith("#/phase/")) return "Cyber";
  if (h.startsWith("#/cyber")) return "Cyber";
  return "Hub";
}

export default function App() {
  const [subject, setSubject] = useState(subjectFromHash());

  useEffect(() => {
    const onHash = () => setSubject(subjectFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-dvh bg-base-100 text-base-content">
        {/* Top bar */}
        <div className="navbar px-4 border-b border-base-300/60">
          <div className="navbar-start gap-2">
            <a href="#/" className="btn btn-ghost text-lg font-semibold">Notes Hub</a>
            <span className="badge badge-outline">{subject}</span>
          </div>
          <div className="navbar-end gap-2">
            <DataMenu />
            <ThemeSwitcher />
          </div>
            <ThemeSwitcher />
          </div>
        </div>

        <HashRouter>
          <Routes>
            <Route path="/" element={<Hub />} />
            <Route path="/cyber" element={<HomeHub />} />
            <Route path="/software" element={<SoftwareApp />} />
            <Route path="/phase/:phaseId/module/:moduleId" element={<ModuleView />} />
          </Routes>
        </HashRouter>
      </div>
    </ThemeProvider>
  );
}
