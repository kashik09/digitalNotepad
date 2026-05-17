/**
 * Theme Utilities - Centralized theme management
 * Consolidates logic previously duplicated between ThemeProvider and ThemeSwitcher
 */

// Dark themes mapped to their light counterparts
export const THEME_PAIRS = {
  'cyber-neon': 'cyber-neon-light',
  'cyber-terminal': 'cyber-terminal-light',
  'cyber-indigo': 'cyber-indigo-light',
  'dev-slate': 'dev-slate-light',
  'dev-ocean': 'dev-ocean-light',
} as const;

// Reverse mapping: light theme -> dark theme
export const REVERSE_PAIRS = Object.fromEntries(
  Object.entries(THEME_PAIRS).map(([dark, light]) => [light, dark])
) as Record<string, DarkTheme>;

// Type definitions
export type ThemeMode = 'light' | 'dark';
export type DarkTheme = keyof typeof THEME_PAIRS;
export type LightTheme = typeof THEME_PAIRS[DarkTheme];
export type Theme = DarkTheme | LightTheme;

// All available dark themes
export const ALL_DARK_THEMES = Object.keys(THEME_PAIRS) as DarkTheme[];

// Default theme configuration
export const DEFAULTS = {
  mode: 'dark' as ThemeMode,
  darkTheme: 'cyber-neon' as DarkTheme,
};

// Storage keys
export const STORAGE_KEYS = {
  mode: 'MODE:active',
  activeTheme: 'THEME:active',
};

/**
 * Apply theme to the document
 */
export function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
}

/**
 * Get the appropriate theme based on mode
 */
export function getThemeForMode(darkTheme: DarkTheme, mode: ThemeMode): Theme {
  return mode === 'light' ? THEME_PAIRS[darkTheme] : darkTheme;
}

/**
 * Check if a theme string is a dark theme
 */
export function isDarkTheme(theme: string): theme is DarkTheme {
  return theme in THEME_PAIRS;
}

/**
 * Get the dark version of any theme
 */
export function getDarkTheme(theme: Theme): DarkTheme {
  return isDarkTheme(theme) ? theme : (REVERSE_PAIRS[theme] as DarkTheme);
}

/**
 * Get the light version of any theme
 */
export function getLightTheme(theme: Theme): LightTheme {
  const darkTheme = getDarkTheme(theme);
  return THEME_PAIRS[darkTheme];
}

/**
 * Get the current theme from the document
 */
export function getCurrentTheme(): Theme {
  if (typeof window === 'undefined') return DEFAULTS.darkTheme;

  return (
    (document.documentElement.getAttribute('data-theme') as Theme) ||
    DEFAULTS.darkTheme
  );
}

/**
 * Get stored mode from localStorage
 */
export function getStoredMode(): ThemeMode {
  if (typeof window === 'undefined') return DEFAULTS.mode;

  try {
    return (localStorage.getItem(STORAGE_KEYS.mode) as ThemeMode) || DEFAULTS.mode;
  } catch {
    return DEFAULTS.mode;
  }
}

/**
 * Store mode to localStorage
 */
export function setStoredMode(mode: ThemeMode): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEYS.mode, mode);
  } catch (e) {
    console.error('Failed to save mode to localStorage:', e);
  }
}

/**
 * Get stored dark theme from localStorage
 */
export function getStoredDarkTheme(): DarkTheme {
  if (typeof window === 'undefined') return DEFAULTS.darkTheme;

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.activeTheme);
    if (stored && isDarkTheme(stored)) {
      return stored as DarkTheme;
    }
    return DEFAULTS.darkTheme;
  } catch {
    return DEFAULTS.darkTheme;
  }
}

/**
 * Store dark theme to localStorage
 */
export function setStoredDarkTheme(darkTheme: DarkTheme): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEYS.activeTheme, darkTheme);
  } catch (e) {
    console.error('Failed to save theme to localStorage:', e);
  }
}
