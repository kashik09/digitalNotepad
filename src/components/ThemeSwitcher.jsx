import { useEffect, useMemo, useState } from "react";

/* Only show DARK choices in the list */
const CYBER_DARK = ["cyber-neon", "cyber-terminal", "cyber-indigo"];
const SOFTWARE_DARK = ["dev-slate", "dev-ocean"];

/* Pair map: dark -> its light twin (and we auto-build the reverse) */
const THEME_PAIRS = {
  "cyber-neon": "cyber-neon-light",
  "cyber-terminal": "cyber-terminal-light",
  "cyber-indigo": "cyber-indigo-light",
  "dev-slate": "dev-slate-light",
  "dev-ocean": "dev-ocean-light",
};
const REVERSE_PAIRS = Object.fromEntries(Object.entries(THEME_PAIRS).map(([d,l]) => [l,d]));

/* Subject from route */
function subjectFromHash() {
  const h = (window.location.hash || "").toLowerCase();
  if (h.startsWith("#/software")) return "software";
  if (h.startsWith("#/cyber") || h.startsWith("#/phase/")) return "cyber";
  return "hub";
}

/* storage helpers */
const kMode = "MODE:active";
const kDarkPick = (s)=>`THEME_DARK:${s}`;

/* apply theme */
function setTheme(t){ if(!t) return; document.documentElement.setAttribute("data-theme", t); try{localStorage.setItem("THEME:active", t);}catch{} }

export default function ThemeSwitcher(){
  const [open,setOpen]=useState(false);
  const [mode,setMode]=useState(()=>localStorage.getItem(kMode) || "dark");
  const subject = subjectFromHash();

  const darkList = useMemo(()=> subject==="software"? SOFTWARE_DARK : subject==="cyber" ? CYBER_DARK : [...CYBER_DARK.slice(0,1), ...SOFTWARE_DARK.slice(0,1)], [subject]);

  function getDarkStored(){
    try{ return localStorage.getItem(kDarkPick(subject)); }catch{}
    return null;
  }
  function setDarkStored(t){
    try{ localStorage.setItem(kDarkPick(subject), t);}catch{}
  }

  function applyByMode(darkTheme, currentMode){
    const isLight = currentMode==="light";
    const t = isLight ? (THEME_PAIRS[darkTheme] || "cyber-neon-light") : darkTheme;
    setTheme(t);
  }

  // Initialize/apply whenever subject or mode changes
  useEffect(()=>{
    try{ localStorage.setItem(kMode, mode);}catch{}
    const dark = getDarkStored() || darkList[0];
    applyByMode(dark, mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[subject, mode]);

  // Close on navigation
  useEffect(()=>{
    const onHash=()=>setOpen(false);
    window.addEventListener("hashchange", onHash);
    return ()=>window.removeEventListener("hashchange", onHash);
  },[]);

  const currentTheme = document.documentElement.getAttribute("data-theme") || localStorage.getItem("THEME:active") || darkList[0];
  // In light mode, derive display label from its dark twin so the chip reads consistently
  const displayLabel = (mode==="light" && REVERSE_PAIRS[currentTheme]) ? REVERSE_PAIRS[currentTheme] : currentTheme;

  return (
    <div className="dropdown dropdown-end">
      <button className="btn btn-sm btn-ghost border border-base-300/60" onClick={()=>setOpen(v=>!v)}>
        🎨 {displayLabel.replace(/^cyber-|^dev-/, "")}
      </button>

      {open && (
        <div className="dropdown-content z-[60] mt-2 p-3 w-64 rounded-xl border border-base-300 bg-base-100 shadow-xl">
          <div className="join w-full mb-3">
            <button className={`btn btn-xs join-item ${mode==="light"?"btn-active":"btn-ghost"}`} onClick={()=>setMode("light")}>☀️ Light</button>
            <button className={`btn btn-xs join-item ${mode==="dark"?"btn-active":"btn-ghost"}`} onClick={()=>setMode("dark")}>🌙 Dark</button>
          </div>

          <div className="badge badge-outline mb-2">{subject==="software"?"Software Engineering":subject==="cyber"?"Cybersecurity":"Hub"}</div>

          <ul className="menu w-full max-h-64 overflow-auto">
            {darkList.map((t)=>{
              const isActiveDark = mode==="dark" && currentTheme===t;
              const isActiveLight = mode==="light" && currentTheme===THEME_PAIRS[t];
              const active = isActiveDark || isActiveLight;
              return (
                <li key={t}>
                  <button
                    className={`justify-between ${active?"active":""}`}
                    onClick={()=>{
                      setDarkStored(t);
                      applyByMode(t, mode);
                      setOpen(false);
                    }}
                  >
                    <span>{t.replace(/^cyber-|^dev-/, "")}</span>
                    {active && <span className="badge badge-sm">selected</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
