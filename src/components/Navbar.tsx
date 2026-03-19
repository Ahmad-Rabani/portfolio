import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { useDarkMode } from '../hooks/useDarkMode';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { scrollToSection, scrollToTop } from '../utils/scrollTo';
import type { NavLink } from '../types';

const NAV_LINKS: NavLink[] = [
  { label: 'About', href: 'about' },
  { label: 'Projects', href: 'projects' },
  { label: 'Skills', href: 'skills' },
  { label: 'Experience', href: 'experience' },
  { label: 'Contact', href: 'contact' },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, toggleDark] = useDarkMode();
  const activeSection = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNav = (href: string) => {
    scrollToSection(href);
    setIsOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)] shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <nav className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 group"
              aria-label="Go to top"
            >
              <div className="w-8 h-8 bg-[var(--color-accent)] rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <span className="font-display font-bold text-charcoal-900 text-sm leading-none">A</span>
              </div>
              <span className="font-display font-bold text-[var(--color-text)] text-lg hidden sm:block">
                Alex<span className="text-[var(--color-accent)]">.</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => handleNav(href)}
                    className={`relative px-4 py-2 text-sm font-body font-medium transition-colors duration-200 rounded-lg ${
                      activeSection === href
                        ? 'text-[var(--color-accent)]'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                    }`}
                  >
                    {label}
                    {activeSection === href && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--color-accent)] rounded-full"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleDark}
                className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-all duration-200"
                aria-label="Toggle dark mode"
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </button>

              <button
                onClick={() => handleNav('contact')}
                className="hidden md:flex btn-primary text-xs px-5 py-2.5"
              >
                Hire Me
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setIsOpen((p) => !p)}
                className="md:hidden p-2 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[var(--color-bg)] md:hidden flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center px-8">
              <ul className="space-y-2">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() => handleNav(href)}
                      className="w-full text-left py-3 font-display text-3xl font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {label}
                    </button>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10"
              >
                <button onClick={() => handleNav('contact')} className="btn-primary">
                  Let's Talk
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
