import { useNavigate } from "react-router-dom";
import AppTile from "../components/AppTile.jsx";

export default function Hub() {
  const nav = useNavigate();
  return (
    <div className="min-h-[calc(100dvh-4rem)] grid place-items-center px-4">
      <div className="flex items-center justify-center gap-8">
        <AppTile icon="🛡️" label="Cybersecurity" onClick={() => nav("/cyber")} />
        <AppTile icon="💻" label="Software Engineering" onClick={() => nav("/software")} />
      </div>
    </div>
  );
}
