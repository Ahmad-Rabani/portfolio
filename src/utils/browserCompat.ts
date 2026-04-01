/**
 * Browser Compatibility & Feature Detection Utility
 * Provides polyfills and fallbacks for modern APIs
 */

/**
 * Feature detection for browser capabilities
 */
export const BrowserFeatures = {
  // Check if localStorage is available and not disabled
  hasLocalStorage: (): boolean => {
    try {
      const test = '__localStorage_test__';
      window.localStorage.setItem(test, test);
      window.localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },

  // Check if CSS Custom Properties are supported
  hasCSSVariables: (): boolean => {
    return CSS && CSS.supports && CSS.supports('--test', '0px');
  },

  // Check if Pointer Events are supported
  hasPointerEvents: (): boolean => {
    return 'PointerEvent' in window;
  },

  // Check if Touch Events are supported
  hasTouchEvents: (): boolean => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },

  // Check if Web Audio API is available
  hasWebAudio: (): boolean => {
    return 'AudioContext' in window || 'webkitAudioContext' in window;
  },

  // Check if Font Loading API is available
  hasFontLoading: (): boolean => {
    return 'fonts' in document;
  },

  // Check if smooth scroll is supported
  hasSmoothScroll: (): boolean => {
    return 'scrollBehavior' in document.documentElement.style;
  },

  // Check if requestAnimationFrame is available
  hasRAF: (): boolean => {
    return 'requestAnimationFrame' in window;
  },

  // Check if matchMedia is supported
  hasMatchMedia: (): boolean => {
    return 'matchMedia' in window;
  },
};

/**
 * Safe localStorage wrapper with fallback to memory storage
 */
class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}

const memoryStorage = new MemoryStorage();

/**
 * Get safe storage instance (localStorage with fallback to memory)
 */
export const getSafeStorage = (): Storage => {
  if (BrowserFeatures.hasLocalStorage()) {
    try {
      return window.localStorage;
    } catch {
      return memoryStorage;
    }
  }
  return memoryStorage;
};

/**
 * Polyfill for smooth scroll behavior on older browsers
 */
export const smoothScrollPolyfill = (): void => {
  if (BrowserFeatures.hasSmoothScroll()) {
    return;
  }

  // Simple polyfill for smooth scroll
  const easeInOutQuad = (t: number): number => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  const originalScrollTo = window.scrollTo.bind(window);

  (window as any).scrollTo = function (
    ...args: any[]
  ): void {
    const [x] = args;

    // Handle ScrollToOptions object
    if (typeof x === 'object' && x !== null) {
      const options = x as ScrollToOptions;

      if (
        options.behavior === 'smooth' &&
        (options.left !== undefined || options.top !== undefined)
      ) {
        const startX = window.scrollX;
        const startY = window.scrollY;
        const targetX = options.left ?? startX;
        const targetY = options.top ?? startY;
        const duration = 300; // ms
        const startTime = Date.now();

        const scroll = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = easeInOutQuad(progress);

          window.scrollX !== targetX &&
            window.scroll(
              startX + (targetX - startX) * easeProgress,
              window.scrollY,
            );
          window.scrollY !== targetY &&
            window.scroll(
              window.scrollX,
              startY + (targetY - startY) * easeProgress,
            );

          if (progress < 1) {
            requestAnimationFrame(scroll);
          }
        };

        requestAnimationFrame(scroll);
        return;
      }
    }

    // Fallback to original behavior
    originalScrollTo(...args);
  };
};

/**
 * Polyfill/shim for requestAnimationFrame on older browsers
 */
export const rafPolyfill = (): void => {
  if (BrowserFeatures.hasRAF()) {
    return;
  }

  let lastTime = 0;

  window.requestAnimationFrame = ((callback: FrameRequestCallback) => {
    const currentTime = Date.now();
    const delay = Math.max(0, 16 - (currentTime - lastTime));
    lastTime = currentTime + delay;

    return window.setTimeout(() => {
      callback(lastTime);
    }, delay);
  }) as any;

  window.cancelAnimationFrame = ((id: number) => {
    clearTimeout(id);
  }) as any;
};

/**
 * Initialize browser compatibility polyfills
 */
export const initBrowserCompat = (): void => {
  smoothScrollPolyfill();
  rafPolyfill();
};

/**
 * Get platform information for debugging/logging
 */
export const getPlatformInfo = (): string => {
  const features = [
    `localStorage: ${BrowserFeatures.hasLocalStorage()}`,
    `cssVariables: ${BrowserFeatures.hasCSSVariables()}`,
    `pointerEvents: ${BrowserFeatures.hasPointerEvents()}`,
    `touchEvents: ${BrowserFeatures.hasTouchEvents()}`,
    `webAudio: ${BrowserFeatures.hasWebAudio()}`,
    `fontLoading: ${BrowserFeatures.hasFontLoading()}`,
    `smoothScroll: ${BrowserFeatures.hasSmoothScroll()}`,
    `RAF: ${BrowserFeatures.hasRAF()}`,
    `matchMedia: ${BrowserFeatures.hasMatchMedia()}`,
  ];

  return features.join(' | ');
};
