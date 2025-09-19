import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "./theme/ThemeProvider.jsx";
import ThemeSwitcher from "./components/ThemeSwitcher.jsx";
import DataMenu from "./components/DataMenu.jsx";
import SubjectSwitch from "./components/SubjectSwitch.jsx";
import Login from "./pages/Login.jsx";
import Hub from "./pages/Hub.jsx";
import HomeHub from "./pages/HomeHub.jsx";         // Cyber notes shell
import SoftwareHub from "./pages/SoftwareHub.jsx"; // Software sub-hub
import SoftwareApp from "./pages/SoftwareApp.jsx"; // Software notes
import SoftwareProjects from "./pages/SoftwareProjects.jsx";
import ModuleView from "./pages/ModuleView.jsx";
import NotFound from "./pages/NotFound.jsx";

const AUTH_OK_KEY = "AUTH:ok";
const LAST_ROUTE_KEY = "LAST:route";

function subjectFromHash() {
  const h = (window.location.hash || "").toLowerCase();
  if (h.startsWith("#/software")) return "Software";
  if (h.startsWith("#/phase/") || h.startsWith("#/cyber")) return "Cyber";
  if (h.startsWith("#/login")) return "Login";
  return "Hub";
}

export default function App() {
  const [subject, setSubject] = useState(subjectFromHash());

  // Guard: block protected routes when not authed; Persist last route otherwise
  useEffect(() => {
    function guardAndPersist() {
      const hash = window.location.hash || "#/";
      const isLogin = hash.startsWith("#/login");
      const authed = localStorage.getItem(AUTH_OK_KEY) === "1";
      if (!authed && !isLogin) {
        window.location.hash = "#/login";
        return;
      }
      // persist last route (skip login)
      if (!isLogin) {
        try { localStorage.setItem(LAST_ROUTE_KEY, hash); } catch {}
      }
      setSubject(subjectFromHash());
    }
    guardAndPersist();
    window.addEventListener("hashchange", guardAndPersist);
    return () => window.removeEventListener("hashchange", guardAndPersist);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-dvh bg-base-100 text-base-content">
        {/* Top bar */}
        <div className="navbar px-4 border-b border-base-300/60">
          <div className="navbar-start gap-2">
            <a href="#/hub" className="btn btn-ghost text-lg font-semibold">Notes Hub</a>
            <span className="badge badge-outline">{subject}</span>
          </div>
          <div className="navbar-end gap-2">
            <DataMenu />
            <SubjectSwitch />
            <ThemeSwitcher />
          </div>
        </div>

        <HashRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hub" element={<Hub />} />
            <Route path="/cyber" element={<HomeHub />} />
            <Route path="/software" element={<SoftwareHub />} />
            <Route path="/software/notes" element={<SoftwareApp />} />
            <Route path="/software/projects" element={<SoftwareProjects />} />
            <Route path="/phase/:phaseId/module/:moduleId" element={<ModuleView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </div>
    </ThemeProvider>
  );
}
