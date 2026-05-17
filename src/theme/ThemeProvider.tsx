/**
 * Theme Provider with React Context
 * Manages global theme state and provides theme switching functionality
 */

'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  applyTheme,
  getThemeForMode,
  getStoredMode,
  setStoredMode,
  getStoredDarkTheme,
  setStoredDarkTheme,
  type ThemeMode,
  type DarkTheme,
  type Theme,
} from '@/lib/theme-utils';

interface ThemeContextValue {
  mode: ThemeMode;
  darkTheme: DarkTheme;
  currentTheme: Theme;
  setMode: (mode: ThemeMode) => void;
  setDarkTheme: (theme: DarkTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Hook to access theme context
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>('dark');
  const [darkTheme, setDarkThemeState] = useState<DarkTheme>('cyber-neon');
  const [mounted, setMounted] = useState(false);

  // Load saved preferences on mount
  useEffect(() => {
    const savedMode = getStoredMode();
    const savedDarkTheme = getStoredDarkTheme();

    setModeState(savedMode);
    setDarkThemeState(savedDarkTheme);
    setMounted(true);
  }, []);

  // Apply theme when mode or darkTheme changes
  useEffect(() => {
    if (!mounted) return;

    const theme = getThemeForMode(darkTheme, mode);
    applyTheme(theme);

    // TODO: Sync to Supabase user_preferences table
    // This will be implemented when Supabase is configured
  }, [mode, darkTheme, mounted]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    setStoredMode(newMode);
  };

  const setDarkTheme = (newTheme: DarkTheme) => {
    setDarkThemeState(newTheme);
    setStoredDarkTheme(newTheme);
  };

  const currentTheme = getThemeForMode(darkTheme, mode);

  const value: ThemeContextValue = {
    mode,
    darkTheme,
    currentTheme,
    setMode,
    setDarkTheme,
  };

  // Prevent flash of unstyled content
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
