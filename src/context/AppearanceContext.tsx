import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppearancePreferences {
  fontSize: number; // in pixels, default 16
  fontFamily: 'inter' | 'poppins' | 'roboto'; // font options
}

type FontFamily = AppearancePreferences['fontFamily'];

interface AppearanceContextType {
  preferences: AppearancePreferences;
  updateFontSize: (size: number) => void;
  updateFontFamily: (family: AppearancePreferences['fontFamily']) => void;
  resetToDefaults: () => void;
}

const DEFAULT_PREFERENCES: AppearancePreferences = {
  fontSize: 16,
  fontFamily: 'inter',
};

const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 24;

const FONT_STACKS: Record<FontFamily, string> = {
  inter: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  poppins: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  roboto: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const isValidFontFamily = (value: unknown): value is FontFamily => {
  return value === 'inter' || value === 'poppins' || value === 'roboto';
};

const clampFontSize = (size: number): number => {
  return Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, size));
};

const normalizePreferences = (
  raw: Partial<AppearancePreferences> | null | undefined,
): AppearancePreferences => {
  const fontSize = Number(raw?.fontSize);

  return {
    fontSize: Number.isFinite(fontSize)
      ? clampFontSize(Math.round(fontSize))
      : DEFAULT_PREFERENCES.fontSize,
    fontFamily: isValidFontFamily(raw?.fontFamily)
      ? raw.fontFamily
      : DEFAULT_PREFERENCES.fontFamily,
  };
};

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined);

export const AppearanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<AppearancePreferences>(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_PREFERENCES;
    }

    const stored = localStorage.getItem('appearance-preferences');
    if (stored) {
      try {
        return normalizePreferences(JSON.parse(stored) as Partial<AppearancePreferences>);
      } catch {
        return DEFAULT_PREFERENCES;
      }
    }
    return DEFAULT_PREFERENCES;
  });

  // Apply preferences to document
  useEffect(() => {
    const root = document.documentElement;
    const fontStack = getSystemFontStack(preferences.fontFamily);

    root.style.setProperty('--base-font-size', `${preferences.fontSize}px`);
    root.style.setProperty('--font-family', fontStack);
    root.style.setProperty('--font-family-display', fontStack);
  }, [preferences]);

  // Warm up selectable fonts early to avoid first-change flash/blink.
  useEffect(() => {
    if (typeof document === 'undefined' || !document.fonts) {
      return;
    }

    void Promise.all([
      document.fonts.load('400 1rem Inter'),
      document.fonts.load('400 1rem Poppins'),
      document.fonts.load('400 1rem Roboto'),
    ]).catch(() => undefined);
  }, []);

  // Temporarily disable transitions while font size is actively changing.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('font-resizing');

    const timeoutId = window.setTimeout(() => {
      root.classList.remove('font-resizing');
    }, 120);

    return () => {
      window.clearTimeout(timeoutId);
      root.classList.remove('font-resizing');
    };
  }, [preferences.fontSize]);

  // Persist to localStorage
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      localStorage.setItem('appearance-preferences', JSON.stringify(preferences));
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [preferences]);

  const updateFontSize = (size: number) => {
    if (!Number.isFinite(size)) {
      return;
    }

    const clampedSize = clampFontSize(Math.round(size));
    setPreferences((prev) => (prev.fontSize === clampedSize ? prev : { ...prev, fontSize: clampedSize }));
  };

  const updateFontFamily = (family: FontFamily) => {
    setPreferences((prev) => (prev.fontFamily === family ? prev : { ...prev, fontFamily: family }));
  };

  const resetToDefaults = () => {
    setPreferences(DEFAULT_PREFERENCES);
  };

  return (
    <AppearanceContext.Provider value={{ preferences, updateFontSize, updateFontFamily, resetToDefaults }}>
      {children}
    </AppearanceContext.Provider>
  );
};

export const useAppearance = (): AppearanceContextType => {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error('useAppearance must be used within AppearanceProvider');
  }
  return context;
};

function getSystemFontStack(fontFamily: AppearancePreferences['fontFamily']): string {
  return FONT_STACKS[fontFamily];
}
