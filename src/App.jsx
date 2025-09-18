import { HashRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "./theme/ThemeProvider.jsx";
import ThemeSwitcher from "./components/ThemeSwitcher.jsx";
import HomeHub from "./pages/HomeHub.jsx";
import ModuleView from "./pages/ModuleView.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-dvh bg-base-100 text-base-content">
        {/* Top bar */}
        <div className="navbar px-4 border-b border-base-300/60">
          <div className="navbar-start">
          </div>
          <div className="navbar-end gap-2">
            <ThemeSwitcher />
          </div>
        </div>

        <HashRouter>
          <Routes>
            <Route path="/" element={<HomeHub />} />
            <Route path="/phase/:phaseId/module/:moduleId" element={<ModuleView />} />
          </Routes>
        </HashRouter>
      </div>
    </ThemeProvider>
  );
}
