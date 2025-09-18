// src/pages/HomeHub.jsx
import { Link } from "react-router-dom";

function Tile({ to, emoji, title, subtitle }) {
  const inner = (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-4 hover:shadow-md transition flex gap-4 items-center">
      <div className="text-3xl">{emoji}</div>
      <div>
        <div className="font-semibold">{title}</div>
        {subtitle && <div className="text-sm opacity-70">{subtitle}</div>}
      </div>
    </div>
  );
  return to ? <Link to={to} className="block">{inner}</Link> : inner;
}

export default function HomeHub() {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <header className="sticky top-0 z-10 backdrop-blur bg-base-100/80 border-b border-base-300">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="font-semibold tracking-tight">🏠 Study Hub</div>
          <div className="ml-auto">
            <Link to="/" className="btn btn-sm btn-ghost">Notes</Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-3">Your Spaces</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Tile
            to="/"
            emoji="🛡️"
            title="Cybersecurity Notes"
            subtitle="Intro & Bootcamp"
          />
          <Tile
            to="/se-coming-soon"
            emoji="💻"
            title="Software Engineering"
            subtitle="Coming soon…"
          />
          <Tile
            to="/portfolio"
            emoji="🌐"
            title="Portfolio"
            subtitle="Link or embed later"
          />
        </div>

        <h2 className="text-lg font-semibold mt-6 mb-2">Cybersecurity shortcuts</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <Tile to="/#notes" emoji="📒" title="Bootcamp Notes" subtitle="Jump to notes" />
          <Tile to="/#overview" emoji="🧭" title="Overview" subtitle="Phase guide" />
        </div>
      </main>
    </div>
  );
}
