/**
 * Theme Switcher Component
 * UI for switching between themes and light/dark modes
 */

'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/src/theme/ThemeProvider';
import { ALL_DARK_THEMES, THEME_PAIRS, REVERSE_PAIRS } from '@/lib/theme-utils';

export default function ThemeSwitcher() {
  const pathname = usePathname();
  const { mode, darkTheme, currentTheme, setMode, setDarkTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!mounted) return null;

  // Display label - in light mode, show the dark theme name for consistency
  const displayLabel =
    mode === 'light' && REVERSE_PAIRS[currentTheme]
      ? REVERSE_PAIRS[currentTheme]
      : currentTheme;

  const handleThemeSelect = (theme: string) => {
    setDarkTheme(theme as any);
    setOpen(false);
  };

  return (
    <div className="dropdown dropdown-end">
      <button
        className="btn btn-sm btn-ghost border border-base-300/60"
        onClick={() => setOpen((v) => !v)}
      >
        🎨 {displayLabel.replace(/^cyber-|^dev-/, '')}
      </button>

      {open && (
        <div className="dropdown-content z-[60] mt-2 p-3 w-64 rounded-xl border border-base-300 bg-base-100 shadow-xl">
          {/* Light/Dark Mode Toggle */}
          <div className="join w-full mb-3">
            <button
              className={`btn btn-xs join-item ${
                mode === 'light' ? 'btn-active' : 'btn-ghost'
              }`}
              onClick={() => setMode('light')}
            >
              ☀️ Light
            </button>
            <button
              className={`btn btn-xs join-item ${
                mode === 'dark' ? 'btn-active' : 'btn-ghost'
              }`}
              onClick={() => setMode('dark')}
            >
              🌙 Dark
            </button>
          </div>

          {/* Theme List */}
          <ul className="menu w-full max-h-64 overflow-auto">
            {ALL_DARK_THEMES.map((theme) => {
              const isActiveDark = mode === 'dark' && currentTheme === theme;
              const isActiveLight =
                mode === 'light' && currentTheme === THEME_PAIRS[theme];
              const active = isActiveDark || isActiveLight;

              return (
                <li key={theme}>
                  <button
                    className={`justify-between ${active ? 'active' : ''}`}
                    onClick={() => handleThemeSelect(theme)}
                  >
                    <span>{theme.replace(/^cyber-|^dev-/, '')}</span>
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
