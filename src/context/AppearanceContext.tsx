import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppearancePreferences {
  fontSize: number; // in pixels, default 16
  fontFamily: 'inter' | 'poppins' | 'roboto'; // font options
}

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

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined);

export const AppearanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<AppearancePreferences>(() => {
    const stored = localStorage.getItem('appearance-preferences');
    if (stored) {
      try {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
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
    
    // Set CSS variables
    root.style.setProperty('--base-font-size', `${preferences.fontSize}px`);
    root.style.setProperty('--font-family', fontStack);
    
    // Apply directly with !important to override any inline styles
    root.style.setProperty('font-size', `${preferences.fontSize}px`, 'important');
    root.style.setProperty('font-family', fontStack, 'important');
    
    document.body.style.setProperty('font-size', `${preferences.fontSize}px`, 'important');
    document.body.style.setProperty('font-family', fontStack, 'important');
    
    // Apply to all common elements
    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, button, a, li, label');
    elements.forEach((el) => {
      (el as HTMLElement).style.setProperty('font-family', fontStack, 'important');
    });
  }, [preferences]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('appearance-preferences', JSON.stringify(preferences));
  }, [preferences]);

  const updateFontSize = (size: number) => {
    // Clamp between 12px and 24px
    const clampedSize = Math.max(12, Math.min(24, size));
    setPreferences((prev) => ({ ...prev, fontSize: clampedSize }));
  };

  const updateFontFamily = (family: AppearancePreferences['fontFamily']) => {
    setPreferences((prev) => ({ ...prev, fontFamily: family }));
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
  const stacks: Record<AppearancePreferences['fontFamily'], string> = {
    inter: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    poppins: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    roboto: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  };
  return stacks[fontFamily];
}
