import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AUTH_OK_KEY = "AUTH:ok";
const AUTH_PIN_KEY = "AUTH:pin";
const AUTH_USERS_KEY = "AUTH:users"; // {"alice": {password:"...", pin:"optional"}}
const AUTH_USER_KEY = "AUTH:user";
const LAST_ROUTE_KEY = "LAST:route";

function loadUsers() {
  try { return JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || "{}"); } catch { return {}; }
}
function saveUsers(o) {
  try { localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(o)); } catch {}
}

export default function Login() {
  const nav = useNavigate();

  const [users, setUsers] = useState(loadUsers());
  const [hasPin, setHasPin] = useState(false);

  const [mode, setMode] = useState("login"); // "login" | "register"
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [pin, setPin] = useState("");
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regPin, setRegPin] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    setHasPin(!!localStorage.getItem(AUTH_PIN_KEY));
  }, []);

  function resumeRoute() {
    let last = "";
    try { last = localStorage.getItem(LAST_ROUTE_KEY) || ""; } catch {}
    if (last && last !== "#/login" && last !== "#/") window.location.hash = last;
    else nav("/hub");
  }

  function doEnter(username) {
    try {
      localStorage.setItem(AUTH_OK_KEY, "1");
      if (username) localStorage.setItem(AUTH_USER_KEY, username);
    } catch {}
    resumeRoute();
  }

  function onLogin() {
    setError("");
    const u = user.trim();
    if (!u || !pass) return setError("Enter username and password.");
    const db = loadUsers();
    if (!db[u] || db[u].password !== pass) return setError("Invalid credentials.");
    // optional global PIN gate (if set)
    const globalPin = localStorage.getItem(AUTH_PIN_KEY);
    if (globalPin && pin !== globalPin) return setError("Wrong PIN.");
    doEnter(u);
  }

  function onRegister() {
    setError("");
    const u = regUser.trim();
    if (!u || !regPass) return setError("Pick a username and password.");
    const db = loadUsers();
    if (db[u]) return setError("User exists. Pick another name.");
    db[u] = { password: regPass };
    saveUsers(db);
    setUsers(db);
    // set optional global PIN now if provided
    if (regPin && /^\d{4}$/.test(regPin)) {
      localStorage.setItem(AUTH_PIN_KEY, regPin);
      setHasPin(true);
    }
    doEnter(u);
  }

  function onClearPin() {
    localStorage.removeItem(AUTH_PIN_KEY);
    setHasPin(false);
    setPin("");
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] grid place-items-center px-4">
      <div className="card bg-base-200 border border-base-300 w-full max-w-md">
        <div className="card-body items-center text-center">
          <div className="text-5xl mb-2">🔐</div>
          <h1 className="text-xl font-semibold mb-1">Welcome</h1>

          {/* toggle small */}
          <div className="join my-2">
            <button className={`btn btn-xs join-item ${mode==="login"?"btn-active":"btn-ghost"}`} onClick={()=>setMode("login")}>Login</button>
            <button className={`btn btn-xs join-item ${mode==="register"?"btn-active":"btn-ghost"}`} onClick={()=>setMode("register")}>Register</button>
          </div>

          {mode === "login" ? (
            <div className="w-full space-y-2">
              <input className="input input-bordered w-full" placeholder="Username" value={user} onChange={e=>setUser(e.target.value)} />
              <input type="password" className="input input-bordered w-full" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)} />
              {hasPin && (
                <input
                  className="input input-bordered w-full text-center tracking-[0.2em]"
                  placeholder="PIN (4 digits)"
                  maxLength={4}
                  value={pin}
                  onChange={e=>setPin(e.target.value.replace(/\D/g,"").slice(0,4))}
                />
              )}
              <button className="btn btn-primary w-full" onClick={onLogin}>Enter</button>
              {hasPin && <button className="btn btn-ghost btn-sm" onClick={onClearPin}>Remove PIN</button>}
            </div>
          ) : (
            <div className="w-full space-y-2">
              <input className="input input-bordered w-full" placeholder="New username" value={regUser} onChange={e=>setRegUser(e.target.value)} />
              <input type="password" className="input input-bordered w-full" placeholder="New password" value={regPass} onChange={e=>setRegPass(e.target.value)} />
              <input
                className="input input-bordered w-full text-center tracking-[0.2em]"
                placeholder="Optional PIN (4 digits)"
                maxLength={4}
                value={regPin}
                onChange={e=>setRegPin(e.target.value.replace(/\D/g,"").slice(0,4))}
              />
              <button className="btn btn-secondary w-full" onClick={onRegister}>Create & Enter</button>
            </div>
          )}

          {!!error && <div className="alert alert-error mt-3 w-full"><span>{error}</span></div>}
        </div>
      </div>
    </div>
  );
}
