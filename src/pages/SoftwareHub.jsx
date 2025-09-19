import { useNavigate } from "react-router-dom";
import AppTile from "../components/AppTile.jsx";

export default function SoftwareHub() {
  const nav = useNavigate();
  return (
    <div className="min-h-[calc(100dvh-4rem)] grid place-items-center px-4">
      <div className="grid grid-cols-3 gap-8 max-sm:grid-cols-2">
        <AppTile icon="📝" label="Notes" onClick={() => nav("/software/notes")} />
        <AppTile icon="🧪" label="Projects" onClick={() => nav("/software/projects")} />
        <AppTile icon="🌐" label="Portfolio" href="https://example.com/" />
      </div>
    </div>
  );
}
