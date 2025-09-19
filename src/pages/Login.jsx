import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  function enter() {
    try { localStorage.setItem("AUTH:ok", "1"); } catch {}
    nav("/hub");
  }
  return (
    <div className="min-h-[calc(100dvh-4rem)] grid place-items-center px-4">
      <div className="card bg-base-200 border border-base-300 w-full max-w-md">
        <div className="card-body items-center text-center">
          <div className="text-5xl mb-2">🔐</div>
          <h1 className="text-xl font-semibold mb-1">Welcome</h1>
          <p className="text-base-content/70 mb-4">Sign in to your notes hub.</p>
          <button className="btn btn-primary w-full" onClick={enter}>Enter</button>
        </div>
      </div>
    </div>
  );
}
