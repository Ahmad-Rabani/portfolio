import { motion } from 'framer-motion';
import { RiMapPinLine, RiCalendarLine, RiCheckDoubleLine, RiDownload2Line } from 'react-icons/ri';
import type { Experience as ExperienceItem } from '../types';

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 1,
    role: 'React Developer',
    company: 'En Route Technologies',
    period: 'Jun 2024 – Present',
    location: 'Onsite',
    current: true,
    achievements: [
      'Developing Garage Management System (GMS) with multi-module architecture for vehicle intake, inspections, and invoicing',
      'Built vehicle-first search flow with debounced API calls and multi-step wizard UX with conditional step skipping',
      'Implemented SVG-based vehicle damage marking system with coordinate capture for inspection module',
      'Designed comprehensive invoice and feedback modules with star ratings and public API integration for customer reviews',
      'Integrated multi-language support and privilege-based menu controls across application modules',
      'Managed messages and notes functionality with cartId-based conditional API logic and safe conditional rendering',
    ],
  },
  {
    id: 2,
    role: 'React Developer',
    company: 'Precise Tech',
    period: 'Jan 2024 – Jun 2024',
    location: 'Remote',
    current: false,
    achievements: [
      'Collaborated in developing and maintaining responsive web applications using React.js with focus on performance and scalability',
      'Implemented reusable, modular UI components adhering to best practices and design standards',
      'Worked with cross-functional teams to deliver features, debug issues, and optimize application performance',
      'Gained hands-on experience with state management libraries, API integration, and modern tools like Next.js',
    ],
  },
  {
    id: 3,
    role: 'React Developer',
    company: 'Elitx Technologies',
    period: 'Aug 2023 – Jan 2024',
    location: 'Onsite',
    current: false,
    achievements: [
      'Completed internship that transitioned into a full-time role, gaining foundational experience in software development',
      'Worked on front-end development projects using React, JavaScript, TypeScript, and Next.js',
      'Designed and executed user interfaces, improving application performance and user experience',
      'Collaborated with dynamic teams to develop and maintain scalable web applications using modern technologies',
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

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <div className="mb-8">
            <span className="label-text">Education</span>
            <div className="divider-line my-3" />
            <h3 className="section-heading">
              Academic{' '}
              <span className="font-display italic font-normal text-[var(--color-text-muted)]">
                background
              </span>
            </h3>
          </div>

          <div className="space-y-4">
            <div className="card-base p-6">
              <p className="font-body font-semibold text-sm text-[var(--color-text)] mb-1">
                Bachelor of Science in Computer Science
              </p>
              <p className="font-body text-xs text-[var(--color-text-muted)]">
                Islamia University Peshawar
              </p>
            </div>
            <div className="card-base p-6">
              <p className="font-body font-semibold text-sm text-[var(--color-text)] mb-1">
                F.sc. (2 year)
              </p>
              <p className="font-body text-xs text-[var(--color-text-muted)]">
                Paradise Children Colleges, Hangu
              </p>
            </div>
            <div className="card-base p-6">
              <p className="font-body font-semibold text-sm text-[var(--color-text)] mb-1">
                Matric (2 year)
              </p>
              <p className="font-body text-xs text-[var(--color-text-muted)]">
                Paradise Children Colleges, Hangu
              </p>
            </div>
          </div>

          <a
            href="/cv/Ahmad Ali Rabani (1) 1 (1).pdf"
            download
            className="inline-flex items-center gap-2 text-sm font-body font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors py-3 px-2 mt-6"
          >
            <RiDownload2Line size={16} />
            Download CV
          </a>
        </motion.div>
      </div>
    </section>
  );
};
