import NotFound from "./pages/NotFound.jsx";
import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "./theme/ThemeProvider.jsx";
import ThemeSwitcher from "./components/ThemeSwitcher.jsx";
import DataMenu from "./components/DataMenu.jsx";
import SubjectSwitch from "./components/SubjectSwitch.jsx";
import Hub from "./pages/Hub.jsx";
import HomeHub from "./pages/HomeHub.jsx";
import SoftwareApp from "./pages/SoftwareApp.jsx";
import ModuleView from "./pages/ModuleView.jsx";

function subjectFromHash() {
  const h = (window.location.hash || "").toLowerCase();
  if (h.startsWith("#/software")) return "Software";
  if (h.startsWith("#/phase/") || h.startsWith("#/cyber")) return "Cyber";
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
            <SubjectSwitch />
            <ThemeSwitcher />
          </div>
        </div>

        <HashRouter>
        </HashRouter>
      </div>
    </ThemeProvider>
  );
}
          <Routes>
            <Route path="/" element={<Hub />} />
            <Route path="/cyber" element={<HomeHub />} />
            <Route path="/software" element={<SoftwareApp />} />
            <Route path="/phase/:phaseId/module/:moduleId" element={<ModuleView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
