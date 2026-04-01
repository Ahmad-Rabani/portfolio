/**
 * Smooth scroll to a section by ID
 * Works with CSS custom property --base-font-size for responsive navbar offset
 */
export const scrollToSection = (id: string): void => {
  const el = document.getElementById(id);
  if (!el) return;

  const navbarHeight = 72;
  const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;

  window.scrollTo({ top, behavior: 'smooth' });
};

/**
 * Smooth scroll to top of page
 * Fallback is handled by browserCompat polyfill for older browsers
 */
export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
