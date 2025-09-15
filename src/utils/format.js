export const LS_KEY = "cyberNotes_v1";

export function minutesToHMS(mins = 0) {
  const m = Math.floor(mins % 60);
  const h = Math.floor(mins / 60);
  if (h <= 0) return `${m}m`;
  return `${h}h ${m}m`;
}

export function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}