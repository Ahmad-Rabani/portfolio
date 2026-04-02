import { motion } from 'framer-motion';
import { RiArrowDownLine, RiDownload2Line } from 'react-icons/ri';
import { scrollToSection } from '../utils/scrollTo';
import { playClickSound } from '../utils/sounds';
import { OptimizedImage } from '../components/OptimizedImage';

const fadeUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Ahmad-Rabani' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmad-ali-rabani-879a12256/' },
  // { label: 'Twitter', href: 'https://twitter.com' },
];

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-[72px]"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large amber circle - top right */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[var(--color-accent)]/5" />
        {/* Small circle - bottom left */}
        <div className="absolute bottom-20 -left-16 w-48 h-48 rounded-full border-2 border-[var(--color-accent)]/10" />
        {/* Grid dots */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--color-text) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="section-container w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center py-16 sm:py-20">
          {/* Left — Text Content */}
          <div className="order-2 lg:order-1">
            {/* Label */}
            <motion.div {...fadeUp(0.1)} className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse" />
              <span className="label-text">Available for work</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 {...fadeUp(0.2)} className="display-heading mb-6">
              Frontend Developer
              <span className="block font-display italic font-normal text-[var(--color-text-muted)] mt-1">
                Creating Clean &
              </span>
              <span className="relative inline-block">
                User-Friendly
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-[var(--color-accent)]/40 rounded-full" />
              </span>{' '}
              <span className="text-[var(--color-accent)]">Experiences</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p {...fadeUp(0.35)} className="body-text max-w-xl mb-8">
              I build fast, responsive, and intuitive web applications that solve real-world problems.
              Focused on delivering value through clean code and thoughtful design.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div {...fadeUp(0.45)} className="flex flex-wrap gap-3 mb-10">
              <button onClick={() => { playClickSound(); scrollToSection('projects'); }} className="btn-primary">
                View My Work
                <RiArrowDownLine size={16} />
              </button>
              <button onClick={() => { playClickSound(); scrollToSection('contact'); }} className="btn-outline">
                Contact Me
              </button>
              <a
                href="/cv/Ahmad Ali Rabani (1) 1 (1).pdf"
                download
                onClick={() => playClickSound()}
                className="inline-flex items-center gap-2 text-sm font-body font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors py-3 px-2"
              >
                <RiDownload2Line size={16} />
                Download CV
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div {...fadeUp(0.55)} className="flex items-center gap-4">
              <span className="text-xs text-[var(--color-text-muted)] font-body uppercase tracking-widest">
                Find me on
              </span>
              <div className="w-12 h-px bg-[var(--color-border)]" />
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-body font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — Avatar/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--color-accent)]/30 animate-spin-slow" style={{ margin: '-24px' }} />

              {/* Avatar container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-[var(--color-bg)] shadow-2xl">
                <OptimizedImage
                  src="/Hero/hero.png"
                  alt="Hero Portrait"
                  className="w-full h-full object-cover"
                  priority={true}
                />
              </div>

              {/* Floating badge — experience */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -right-4 top-8 card-base px-4 py-2.5 shadow-lg"
              >
                <div className="text-xl font-display font-bold text-[var(--color-text)]">2+</div>
                <div className="text-xs font-body text-[var(--color-text-muted)]">Years Exp.</div>
              </motion.div>

              {/* Floating badge — projects */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.95, duration: 0.5 }}
                className="absolute -left-4 bottom-12 card-base px-4 py-2.5 shadow-lg"
              >
                <div className="text-xl font-display font-bold text-[var(--color-text)]">15+</div>
                <div className="text-xs font-body text-[var(--color-text-muted)]">Projects Done</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex justify-center pb-8"
        >
          <button
            onClick={() => { playClickSound(); scrollToSection('about'); }}
            className="flex flex-col items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors group"
          >
            <span className="text-xs font-body uppercase tracking-widest">Scroll down</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <RiArrowDownLine size={18} />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
