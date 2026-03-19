import { motion } from 'framer-motion';
import { RiBriefcaseLine, RiCodeSSlashLine, RiSpeedLine } from 'react-icons/ri';
import type { SummaryCard } from '../types';

interface CardData extends SummaryCard {
  icon: React.ReactNode;
  accent: string;
}

const CARDS: CardData[] = [
  {
    value: '2+',
    label: 'Years of Experience',
    description: 'Building production-grade web apps across startups and agencies',
    icon: <RiBriefcaseLine size={24} />,
    accent: 'from-amber-500/20 to-amber-500/5',
  },
  {
    value: 'React & TS',
    label: 'Core Specialist',
    description: 'Deep expertise in the React ecosystem — hooks, state management, performance patterns',
    icon: <RiCodeSSlashLine size={24} />,
    accent: 'from-blue-500/20 to-blue-500/5',
  },
  {
    value: '⚡ UX',
    label: 'Performance & UX',
    description: 'Obsessed with load times, accessibility scores, and delightful micro-interactions',
    icon: <RiSpeedLine size={24} />,
    accent: 'from-green-500/20 to-green-500/5',
  },
];

export const Summary: React.FC = () => {
  return (
    <section id="summary" className="section-padding">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-text">What I Bring</span>
            <div className="flex justify-center mt-3 mb-4">
              <div className="divider-line" />
            </div>
            <h2 className="section-heading">
              Professional{' '}
              <span className="font-display italic font-normal text-[var(--color-text-muted)]">
                at a glance
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="card-base p-7 relative overflow-hidden group"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Icon */}
              <div className="relative w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] mb-5">
                {card.icon}
              </div>

              {/* Value */}
              <div className="relative font-display text-3xl font-bold text-[var(--color-text)] mb-1">
                {card.value}
              </div>

              {/* Label */}
              <div className="relative font-body font-semibold text-sm text-[var(--color-text)] mb-2 uppercase tracking-wider">
                {card.label}
              </div>

              {/* Description */}
              <p className="relative font-body text-sm text-[var(--color-text-muted)] leading-relaxed">
                {card.description}
              </p>

              {/* Decorative number */}
              <div className="absolute -bottom-3 -right-2 font-display text-8xl font-bold text-[var(--color-accent)]/5 leading-none select-none">
                {i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
