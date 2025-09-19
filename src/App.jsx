import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "./theme/ThemeProvider.jsx";
import ThemeSwitcher from "./components/ThemeSwitcher.jsx";
import Login from "./pages/Login.jsx";
import Hub from "./pages/Hub.jsx";
import HomeHub from "./pages/HomeHub.jsx";
import SoftwareHub from "./pages/SoftwareHub.jsx";
import SoftwareApp from "./pages/SoftwareApp.jsx";
import SoftwareProjects from "./pages/SoftwareProjects.jsx";
import ModuleView from "./pages/ModuleView.jsx";
import NotFound from "./pages/NotFound.jsx";

const AUTH_OK_KEY = "AUTH:ok";
const LAST_ROUTE_KEY = "LAST:route";

function subjectFromHash() {
  const h = (window.location.hash || "").toLowerCase();
  if (h.startsWith("#/software")) return "Software Engineering";
  if (h.startsWith("#/phase/") || h.startsWith("#/cyber")) return "Cybersecurity";
  if (h.startsWith("#/login")) return "Login";
  return "Hub";
}

export default function App() {
  const [subject, setSubject] = useState(subjectFromHash());

  useEffect(() => {
    function guardAndPersist() {
      const hash = window.location.hash || "#/";
      const isLogin = hash.startsWith("#/login");
      const authed = localStorage.getItem(AUTH_OK_KEY) === "1";
      if (!authed && !isLogin) {
        window.location.hash = "#/login";
        return;
      }
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
        {/* navbar: ThemeSwitcher only */}
        <div className="navbar px-4 border-b border-base-300/60 justify-end">
          <ThemeSwitcher />
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
