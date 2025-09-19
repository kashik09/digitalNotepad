export default function ThemeIllustration({ className = "" }) {
  // SVG colors follow the current theme via Tailwind/DaisyUI utility classes.
  // We set fill/stroke to currentColor and then use text-* classes.
  return (
    <svg
      viewBox="0 0 320 200"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full max-w-lg ${className}`}
      role="img"
      aria-label="Theme reactive illustration"
    >
      {/* background grid */}
      <g className="text-base-300" fill="currentColor" opacity="0.25">
        {Array.from({ length: 16 }).map((_, i) => (
          <rect key={i} x={(i % 8) * 40} y={Math.floor(i / 8) * 40} width="36" height="36" rx="6" />
        ))}
      </g>

      {/* code window */}
      <g transform="translate(90,30)">
        <rect width="140" height="90" rx="10" className="text-base-200" fill="currentColor" />
        <rect width="140" height="18" rx="10" className="text-base-300" fill="currentColor" />
        <g transform="translate(10,5)" className="text-accent" fill="currentColor">
          <circle r="4" cx="0" cy="4" />
          <circle r="4" cx="14" cy="4" />
          <circle r="4" cx="28" cy="4" />
        </g>
        <g transform="translate(16,34)" className="text-primary" fill="currentColor">
          <rect x="0" y="0" width="80" height="8" rx="4" />
          <rect x="0" y="18" width="108" height="8" rx="4" opacity="0.8" />
          <rect x="0" y="36" width="64" height="8" rx="4" opacity="0.6" />
        </g>
      </g>

      {/* shield/lock combo */}
      <g transform="translate(40,100)">
        <path
          d="M40 0 L80 16 L80 48 C80 72 60 92 40 104 C20 92 0 72 0 48 L0 16 Z"
          className="text-secondary"
          fill="currentColor"
          opacity="0.95"
        />
        <g transform="translate(24,36)">
          <rect x="0" y="12" width="32" height="22" rx="6" className="text-base-100" fill="currentColor" />
          <circle cx="16" cy="12" r="10" className="text-base-100" fill="currentColor" />
          <circle cx="16" cy="12" r="6" className="text-primary" fill="currentColor" />
        </g>
      </g>

      {/* 404 text */}
      <g transform="translate(60,168)" className="text-base-content" fill="currentColor">
        <text x="0" y="0" fontSize="28" fontWeight="700">404</text>
        <text x="64" y="0" fontSize="16" opacity="0.75">Page not found</text>
      </g>
    </svg>
  );
}
