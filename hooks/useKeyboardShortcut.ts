/**
 * Keyboard Shortcut Hook
 * Handles global keyboard shortcuts with modifier support
 */

import { useEffect } from 'react';

export type KeyCombo = string; // e.g., 'cmd+k', 'ctrl+shift+n', 'esc'

/**
 * Hook to register keyboard shortcuts
 * @param combos - Single combo or array of combos that trigger the callback
 * @param callback - Function to execute when shortcut is pressed
 * @param deps - Dependencies array (optional)
 *
 * @example
 * useKeyboardShortcut('cmd+k', () => setSearchOpen(true));
 * useKeyboardShortcut(['cmd+k', 'ctrl+k'], () => setSearchOpen(true));
 */
export function useKeyboardShortcut(
  combos: KeyCombo | KeyCombo[],
  callback: (event: KeyboardEvent) => void,
  deps: any[] = []
): void {
  useEffect(() => {
    const comboArray = Array.isArray(combos) ? combos : [combos];

    const handler = (event: KeyboardEvent) => {
      for (const combo of comboArray) {
        if (matchesCombo(event, combo)) {
          event.preventDefault();
          callback(event);
          break;
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combos, ...deps]);
}

/**
 * Check if keyboard event matches a key combo string
 */
function matchesCombo(event: KeyboardEvent, combo: string): boolean {
  const parts = combo.toLowerCase().split('+');
  const key = parts.pop()!;

  // Check modifiers
  const wantsCmd = parts.includes('cmd') || parts.includes('meta');
  const wantsCtrl = parts.includes('ctrl');
  const wantsShift = parts.includes('shift');
  const wantsAlt = parts.includes('alt');

  // Match modifiers
  const cmdMatch = wantsCmd ? (event.metaKey || event.ctrlKey) : !event.metaKey;
  const ctrlMatch = wantsCtrl ? event.ctrlKey : true;
  const shiftMatch = wantsShift ? event.shiftKey : !event.shiftKey;
  const altMatch = wantsAlt ? event.altKey : !event.altKey;

  // Match key
  const keyMatch = event.key.toLowerCase() === key || event.code.toLowerCase() === key.toLowerCase();

  return cmdMatch && ctrlMatch && shiftMatch && altMatch && keyMatch;
}

/**
 * Hook to detect if a specific key is currently pressed
 */
export function useKeyPress(targetKey: string): boolean {
  const [keyPressed, setKeyPressed] = React.useState(false);

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };

    const upHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return keyPressed;
}

// Import React for useKeyPress hook
import React from 'react';
