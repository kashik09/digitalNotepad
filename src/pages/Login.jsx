import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AUTH_OK_KEY = "AUTH:ok";
const AUTH_PIN_KEY = "AUTH:pin";
const LAST_ROUTE_KEY = "LAST:route";

export default function Login() {
  const nav = useNavigate();
  const [hasPin, setHasPin] = useState(false);
  const [pin, setPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [newPin2, setNewPin2] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try { setHasPin(!!localStorage.getItem(AUTH_PIN_KEY)); } catch {}
  }, []);

  function resumeRoute() {
    let last = "";
    try { last = localStorage.getItem(LAST_ROUTE_KEY) || ""; } catch {}
    if (last && last !== "#/login" && last !== "#/") {
      window.location.hash = last;
    } else {
      nav("/hub");
    }
  }

  function enter() {
    try { localStorage.setItem(AUTH_OK_KEY, "1"); } catch {}
    resumeRoute();
  }

  function onSubmitPin() {
    setError("");
    try {
      const stored = localStorage.getItem(AUTH_PIN_KEY);
      if (!stored) return setError("No PIN set. Use 'Set PIN' or Enter without PIN.");
      if (pin !== stored) return setError("Wrong PIN.");
      localStorage.setItem(AUTH_OK_KEY, "1");
      resumeRoute();
    } catch (e) {
      console.error(e);
      setError("Could not verify PIN.");
    }
  }

  function onSetPin() {
    setError("");
    if (!/^\d{4}$/.test(newPin)) return setError("PIN must be 4 digits.");
    if (newPin !== newPin2) return setError("PINs do not match.");
    try {
      localStorage.setItem(AUTH_PIN_KEY, newPin);
      setHasPin(true);
      // auto-enter after setting
      localStorage.setItem(AUTH_OK_KEY, "1");
      resumeRoute();
    } catch (e) {
      console.error(e);
      setError("Could not save PIN.");
    }
  }

  function clearPin() {
    try { localStorage.removeItem(AUTH_PIN_KEY); } catch {}
    setHasPin(false);
    setNewPin(""); setNewPin2(""); setPin("");
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] grid place-items-center px-4">
      <div className="card bg-base-200 border border-base-300 w-full max-w-md">
        <div className="card-body items-center text-center">
          <div className="text-5xl mb-2">🔐</div>
          <h1 className="text-xl font-semibold mb-1">Welcome</h1>
          <p className="text-base-content/70 mb-4">Enter your notes hub.</p>

          {hasPin ? (
            <div className="w-full space-y-2">
              <input
                className="input input-bordered w-full text-center tracking-[0.4em]"
                placeholder="••••"
                maxLength={4}
                value={pin}
                onChange={e => setPin(e.target.value.replace(/\D/g, "").slice(0,4))}
              />
              <button className="btn btn-primary w-full" onClick={onSubmitPin}>Unlock</button>
              <button className="btn btn-ghost btn-sm" onClick={clearPin}>Remove PIN</button>
            </div>
          ) : (
            <div className="w-full space-y-2">
              <details className="collapse collapse-arrow border border-base-300 bg-base-100">
                <summary className="collapse-title text-left">Set a 4-digit PIN (optional)</summary>
                <div className="collapse-content space-y-2">
                  <input
                    className="input input-bordered w-full text-center tracking-[0.4em]"
                    placeholder="New PIN"
                    maxLength={4}
                    value={newPin}
                    onChange={e => setNewPin(e.target.value.replace(/\D/g, "").slice(0,4))}
                  />
                  <input
                    className="input input-bordered w-full text-center tracking-[0.4em]"
                    placeholder="Confirm PIN"
                    maxLength={4}
                    value={newPin2}
                    onChange={e => setNewPin2(e.target.value.replace(/\D/g, "").slice(0,4))}
                  />
                  <button className="btn btn-secondary w-full" onClick={onSetPin}>Set PIN & Enter</button>
                </div>
              </details>
              <div className="divider my-1">or</div>
              <button className="btn btn-primary w-full" onClick={enter}>Enter</button>
            </div>
          )}

          {!!error && <div className="alert alert-error mt-3"><span>{error}</span></div>}
        </div>
      </div>
    </div>
  );
}
