import { clamp } from "../utils/format";

export function ProgressRing({ value }) {
  const radius = 26, stroke = 6, norm = radius - stroke / 2;
  const circ = 2 * Math.PI * norm;
  const pct = clamp(value, 0, 100) / 100;
  return (
    <svg className="w-16 h-16" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
      <circle cx={radius} cy={radius} r={norm} stroke="#e5e7eb" strokeWidth={stroke} fill="none" />
      <circle cx={radius} cy={radius} r={norm} stroke="currentColor" strokeWidth={stroke} fill="none"
              strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
              className="text-blue-500 transition-all duration-300" />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-sm fill-gray-700">
        {Math.round(pct * 100)}%
      </text>
    </svg>
  );
}
