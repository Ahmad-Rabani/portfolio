import { motion } from 'framer-motion';
import { RiMapPinLine, RiCalendarLine, RiCheckDoubleLine } from 'react-icons/ri';
import type { Experience as ExperienceItem } from '../types';

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 1,
    role: 'Frontend Developer',
    company: 'TechVentures Studio',
    period: 'Jan 2024 – Present',
    location: 'Remote',
    current: true,
    achievements: [
      'Led the rewrite of the core product dashboard from Vue to React, reducing bundle size by 35% and cutting time-to-interactive from 4.2s to 1.8s',
      'Built a reusable component library (32 components) now used across 4 internal products, saving ~200 hours of dev work per quarter',
      'Improved mobile experience through a full responsive audit, increasing mobile session duration by 22%',
      'Mentored 2 junior developers through code reviews and pair programming sessions',
    ],
  },
  {
    id: 2,
    role: 'Junior Frontend Developer',
    company: 'BrightPixel Agency',
    period: 'Jun 2022 – Dec 2023',
    location: 'Hybrid — London, UK',
    current: false,
    achievements: [
      'Delivered 8 client websites on time, including a high-traffic e-commerce site serving 50k+ monthly visitors',
      'Introduced Tailwind CSS to the agency workflow, reducing average styling time per feature by ~30%',
      'Fixed 40+ accessibility issues across client projects, helping 2 clients pass WCAG 2.1 AA audits',
      'Integrated third-party APIs (Stripe, Mailchimp, Google Maps) across multiple client projects',
    ],
  },
  {
    id: 3,
    role: 'Freelance Web Developer',
    company: 'Self-employed',
    period: 'Jan 2022 – May 2022',
    location: 'Remote',
    current: false,
    achievements: [
      'Built and launched 5 portfolio and business websites for independent clients',
      'Designed and developed a custom booking system for a local service business, replacing manual email scheduling',
      'Maintained 100% client satisfaction rating across all engagements',
    ],
  },
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="section-padding bg-[var(--color-surface)]">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="label-text">Career</span>
          <div className="divider-line my-3" />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="section-heading">
              Work{' '}
              <span className="font-display italic font-normal text-[var(--color-text-muted)]">
                experience
              </span>
            </h2>
            <p className="body-text text-sm max-w-xs">
              Focused on measurable achievements, not just responsibilities.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop */}
          <div className="hidden md:block absolute left-[196px] top-0 bottom-0 w-px bg-[var(--color-border)]" />

          <div className="space-y-10">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="md:grid md:grid-cols-[196px_1fr] gap-0"
              >
                {/* Left — Date + Company */}
                <div className="md:pr-10 mb-4 md:mb-0 md:text-right">
                  <div className="flex items-center gap-2 md:justify-end mb-1">
                    <RiCalendarLine size={13} className="text-[var(--color-accent)] md:order-2" />
                    <span className="text-xs font-body font-medium text-[var(--color-text-muted)]">
                      {exp.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 md:justify-end">
                    <RiMapPinLine size={12} className="text-[var(--color-text-muted)] md:order-2" />
                    <span className="text-xs font-body text-[var(--color-text-muted)]">
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Right — Card */}
                <div className="relative md:pl-10">
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-0 top-5 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)] items-center justify-center">
                    {exp.current && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                    )}
                  </div>

                  <div className="card-base p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-body font-semibold text-base text-[var(--color-text)]">
                          {exp.role}
                        </h3>
                        <p className="font-display font-bold text-lg text-[var(--color-accent)]">
                          {exp.company}
                        </p>
                      </div>
                      {exp.current && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-body font-semibold px-2.5 py-1 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                          Current
                        </span>
                      )}
                    </div>

                    <ul className="space-y-2.5">
                      {exp.achievements.map((achievement, ai) => (
                        <motion.li
                          key={ai}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + ai * 0.05 }}
                          className="flex items-start gap-2.5"
                        >
                          <RiCheckDoubleLine
                            size={15}
                            className="text-[var(--color-accent)] shrink-0 mt-0.5"
                          />
                          <span className="font-body text-sm text-[var(--color-text-muted)] leading-relaxed">
                            {achievement}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 card-base p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <p className="font-body font-semibold text-sm text-[var(--color-text)] mb-1">
              BSc Computer Science
            </p>
            <p className="font-body text-xs text-[var(--color-text-muted)]">
              University of Manchester · 2018 – 2022 · First Class Honours
            </p>
          </div>
          <a href="#" className="btn-outline text-xs px-5 py-2.5 whitespace-nowrap">
            Download CV
          </a>
        </motion.div>
      </div>
    </section>
  );
};
