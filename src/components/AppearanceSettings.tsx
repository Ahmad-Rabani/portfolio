import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiSettingsLine, RiCloseLine } from 'react-icons/ri';
import { useAppearance } from '../context/AppearanceContext';
import { playClickSound } from '../utils/sounds';

const FONT_FAMILIES = [
  { value: 'inter' as const, label: 'Inter' },
  { value: 'poppins' as const, label: 'Poppins' },
  { value: 'roboto' as const, label: 'Roboto' },
];

export const AppearanceSettings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { preferences, updateFontSize, updateFontFamily, resetToDefaults } = useAppearance();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 12 && value <= 24) {
      updateFontSize(value);
    }
  };

  const handleFontFamilyChange = (family: typeof FONT_FAMILIES[0]['value']) => {
    playClickSound();
    updateFontFamily(family);
  };

  const handleReset = () => {
    playClickSound();
    resetToDefaults();
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Settings Button */}
      <button
        onClick={() => {
          playClickSound();
          setIsOpen((p) => !p);
        }}
        className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-all duration-200"
        aria-label="Appearance settings"
        title="Appearance settings"
      >
        <RiSettingsLine size={18} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 mt-2 w-72 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-lg p-4 z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-sm font-semibold text-[var(--color-text)]">
                Appearance
              </h3>
              <button
                onClick={() => {
                  playClickSound();
                  setIsOpen(false);
                }}
                className="p-1 hover:bg-[var(--color-bg)] rounded transition-colors"
                aria-label="Close"
              >
                <RiCloseLine size={16} />
              </button>
            </div>

            {/* Font Size Control */}
            <div className="space-y-3 mb-4 pb-4 border-b border-[var(--color-border)]">
              <label className="block text-xs font-semibold text-[var(--color-text)] uppercase tracking-wide">
                Font Size: <span className="text-[var(--color-accent)]">{preferences.fontSize}px</span>
              </label>

              {/* Slider */}
              <input
                type="range"
                min="12"
                max="24"
                value={preferences.fontSize}
                onChange={handleFontSizeChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer slider will-change-auto transition-all"
                style={{
                  background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${((preferences.fontSize - 12) / 12) * 100}%, var(--color-border) ${((preferences.fontSize - 12) / 12) * 100}%, var(--color-border) 100%)`,
                }}
              />

              {/* Input Field */}
              <div className="flex gap-2">
                <input
                  type="number"
                  min="12"
                  max="24"
                  value={preferences.fontSize}
                  onChange={(e) => updateFontSize(Number(e.target.value))}
                  className="flex-1 px-3 py-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50"
                />
                <span className="px-3 py-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-muted)]">
                  px
                </span>
              </div>

              {/* Presets */}
              <div className="flex gap-2">
                {[14, 16, 18].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      playClickSound();
                      updateFontSize(size);
                    }}
                    className={`flex-1 py-1.5 px-2 text-xs font-medium rounded transition-all ${
                      preferences.fontSize === size
                        ? 'bg-[var(--color-accent)] text-charcoal-900 font-semibold'
                        : 'bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)]'
                    }`}
                  >
                    {size}px
                  </button>
                ))}
              </div>
            </div>

            {/* Font Family Control */}
            <div className="space-y-3 mb-4 pb-4 border-b border-[var(--color-border)]">
              <label className="block text-xs font-semibold text-[var(--color-text)] uppercase tracking-wide">
                Font Family
              </label>

              <div className="grid grid-cols-3 gap-2">
                {FONT_FAMILIES.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => handleFontFamilyChange(value)}
                    className={`py-2 px-3 text-xs font-medium rounded transition-all ${
                      preferences.fontFamily === value
                        ? 'bg-[var(--color-accent)] text-charcoal-900 font-semibold'
                        : 'bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)]'
                    }`}
                    style={{
                      fontFamily: value === 'inter' ? 'Inter' : value === 'poppins' ? 'Poppins' : 'Roboto',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Preview */}
              <div
                className="p-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-xs text-[var(--color-text-muted)]"
                style={{
                  fontFamily: preferences.fontFamily === 'inter' ? 'Inter' : preferences.fontFamily === 'poppins' ? 'Poppins' : 'Roboto',
                }}
              >
                The quick brown fox jumps over the lazy dog
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full py-2 px-3 text-xs font-semibold bg-[var(--color-bg)] hover:bg-[var(--color-border)] text-[var(--color-text)] rounded-lg transition-colors"
            >
              Reset to Defaults
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slider styling for cross-browser compatibility */}
      <style>{`
        .slider {
          -webkit-appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 5px;
          background: transparent;
          outline: none;
          -webkit-slider-thumb-appearance: none;
          box-shadow: none;
          border: none;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--color-accent);
          cursor: grab;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          border: 2px solid var(--color-bg);
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(232, 164, 53, 0.4);
        }

        .slider::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.05);
        }

        .slider::-webkit-slider-runnable-track {
          background: transparent;
          height: 8px;
          border-radius: 5px;
        }

        .slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--color-accent);
          cursor: grab;
          border: 2px solid var(--color-bg);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(232, 164, 53, 0.4);
        }

        .slider::-moz-range-thumb:active {
          cursor: grabbing;
          transform: scale(1.05);
        }

        .slider::-moz-range-track {
          background: transparent;
          border: none;
          box-shadow: none;
        }

        .slider::-moz-range-progress {
          background: transparent;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};
