export const scrollToSection = (id: string): void => {
  const el = document.getElementById(id);
  if (!el) return;

  const navbarHeight = 72;
  const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;

  window.scrollTo({ top, behavior: 'smooth' });
};

export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
