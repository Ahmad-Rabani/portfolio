import { motion } from 'framer-motion';
import { RiGithubLine, RiLinkedinBoxLine, RiTwitterXLine, RiHeartFill } from 'react-icons/ri';
import { scrollToSection, scrollToTop } from '../utils/scrollTo';

const NAV_LINKS = [
  { label: 'About', href: 'about' },
  { label: 'Projects', href: 'projects' },
  { label: 'Skills', href: 'skills' },
  { label: 'Experience', href: 'experience' },
  { label: 'Contact', href: 'contact' },
];

const SOCIAL = [
  { icon: <RiGithubLine size={18} />, href: 'https://github.com', label: 'GitHub' },
  { icon: <RiLinkedinBoxLine size={18} />, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: <RiTwitterXLine size={18} />, href: 'https://twitter.com', label: 'Twitter' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)]">
      <div className="section-container py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <button onClick={scrollToTop} className="flex items-center gap-2 mb-3 group">
              <div className="w-7 h-7 bg-[var(--color-accent)] rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <span className="font-display font-bold text-charcoal-900 text-xs">A</span>
              </div>
              <span className="font-display font-bold text-[var(--color-text)] text-base">
                Alex<span className="text-[var(--color-accent)]">.</span>
              </span>
            </button>
            <p className="font-body text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[220px]">
              Frontend developer building clean, fast, and user-friendly web experiences.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="font-body text-xs font-semibold text-[var(--color-text)] uppercase tracking-widest mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollToSection(href)}
                    className="font-body text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="font-body text-xs font-semibold text-[var(--color-text)] uppercase tracking-widest mb-4">
              Find Me On
            </p>
            <div className="flex gap-3">
              {SOCIAL.map(({ icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/40 transition-all duration-200"
                >
                  {icon}
                </motion.a>
              ))}
            </div>

            <div className="mt-6">
              <p className="font-body text-xs text-[var(--color-text-muted)] mb-1">Available for work</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-body text-xs font-medium text-[var(--color-text)]">
                  Open to opportunities
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--color-border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} Alex Johnson. All rights reserved.
          </p>
          <p className="font-body text-xs text-[var(--color-text-muted)] flex items-center gap-1.5">
            Built with{' '}
            <RiHeartFill size={11} className="text-[var(--color-accent)]" />
            {' '}React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
