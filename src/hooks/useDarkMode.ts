import { useState, useEffect } from 'react';
import { getSafeStorage, BrowserFeatures } from '../utils/browserCompat';

export const useDarkMode = (): [boolean, () => void] => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const storage = getSafeStorage();
    const stored = storage.getItem('theme');
    if (stored) return stored === 'dark';

    // Graceful fallback if matchMedia is not available
    if (BrowserFeatures.hasMatchMedia()) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    return false; // Default to light mode if no preference detection
  });

  useEffect(() => {
    const storage = getSafeStorage();
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      storage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {
      // Storage may be unavailable or disabled
    }
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return [isDark, toggle];
};
