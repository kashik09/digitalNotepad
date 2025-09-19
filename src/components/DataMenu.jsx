import { useRef } from "react";
import { LS_KEY } from "../utils/format.js";

export default function DataMenu() {
  const fileRef = useRef(null);

  function exportJSON() {
    try {
      const raw = localStorage.getItem(LS_KEY) || "{}";
      const blob = new Blob([raw], { type: "application/json" });
      const stamp = new Date().toISOString().replace(/[:.]/g, "-");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `notes-backup-${stamp}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);
    } catch (e) {
      console.error(e);
      alert("Export failed. Check console for details.");
    }
  }

  function onPickFile() {
    if (fileRef.current) fileRef.current.click();
  }

  async function onImportChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (typeof parsed !== "object" || parsed === null || !parsed.items) {
        alert("Invalid backup file. Expected an object with an 'items' field.");
        e.target.value = "";
        return;
      }
      if (!confirm("Importing will REPLACE your current notes & progress. Continue?")) {
        e.target.value = "";
        return;
      }
      localStorage.setItem(LS_KEY, JSON.stringify(parsed));
      alert("Import complete. Reloading to apply changes.");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Import failed. Make sure the file is a valid backup JSON.");
    } finally {
      e.target.value = "";
    }
  }

  return (
    <div className="dropdown dropdown-end">
      <button className="btn btn-xs sm:btn-sm btn-ghost border border-base-300/60" tabIndex={0}>
        🗂️ Data
      </button>
      <ul tabIndex={0} className="dropdown-content z-[60] menu p-2 shadow-lg bg-base-200 border border-base-300 rounded-xl w-56">
        <li>
          <button onClick={exportJSON}>Export JSON</button>
        </li>
        <li>
          <button onClick={onPickFile}>Import JSON…</button>
        </li>
      </ul>

      {/* hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={onImportChange}
      />
    </div>
  );
}
