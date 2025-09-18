import { useState } from "react";
import OverviewSoftware from "../components/OverviewSoftware.jsx";

export default function SoftwareApp() {
  const [view, setView] = useState("overview"); // "overview" | "notes"

  return (
    <div className="p-4 sm:p-6">
      {/* Tabs */}
      <div role="tablist" className="tabs tabs-boxed mb-4">
        <button
          role="tab"
          className={`tab ${view === "overview" ? "tab-active" : ""}`}
          onClick={() => setView("overview")}
        >
          Overview
        </button>
        <button
          role="tab"
          className={`tab ${view === "notes" ? "tab-active" : ""}`}
          onClick={() => setView("notes")}
        >
          Notes
        </button>
      </div>

      {view === "overview" ? (
        <OverviewSoftware />
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Software Notes</h2>
          <p className="text-base-content/70">
            Your Software Dev modules will appear here (own data + routes), separate from Cyber.
          </p>
          <div className="alert">
            <span>Stub view — we’ll wire modules & sections when you’re ready.</span>
          </div>
        </div>
      )}
    </div>
  );
}
