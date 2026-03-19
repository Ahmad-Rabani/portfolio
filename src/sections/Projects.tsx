import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '../components/ProjectCard';
import type { Project } from '../types';

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'TaskFlow — Project Manager',
    description: 'A collaborative project management tool with real-time updates, drag-and-drop kanban boards, and team workspaces.',
    problem: 'Teams were losing track of tasks across too many disconnected tools.',
    impact: 'Reduced project coordination time by 40% in user testing sessions.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 2,
    title: 'ShopLens — E-Commerce UI',
    description: 'A modern e-commerce storefront with smart search, filter UX, wishlist, and a streamlined checkout flow.',
    problem: 'High cart abandonment due to a confusing, slow checkout experience.',
    impact: 'Prototype testing showed 28% improvement in checkout completion rate.',
    tech: ['React', 'Redux', 'CSS Modules'],
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
  {
    id: 3,
    title: 'PulseBoard — Analytics Dashboard',
    description: 'A data visualization dashboard for tracking SaaS metrics — MRR, churn, cohorts — with interactive charts.',
    problem: 'Founders lacked a clear, at-a-glance view of their most critical business metrics.',
    impact: 'Helped 3 early-stage startups identify churn patterns within the first week of use.',
    tech: ['React', 'TypeScript', 'Recharts'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&fit=crop',
    liveUrl: '#',
    githubUrl: 'https://github.com',
    featured: false,
  },
  {
    id: 4,
    title: 'Folio — Design Portfolio Builder',
    description: 'A no-code portfolio builder for creatives. Drag-and-drop sections, live preview, and one-click publishing.',
    problem: 'Designers were spending hours coding portfolios instead of designing.',
    impact: 'Reduced time to publish a portfolio from days to under 30 minutes.',
    tech: ['React', 'Framer Motion', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 5,
    title: 'WeatherMap — Live Weather App',
    description: 'A beautiful, location-aware weather app with 7-day forecasts, hourly breakdowns, and animated weather visuals.',
    problem: 'Existing weather apps were cluttered and hard to read at a glance.',
    impact: 'Achieved 4.8/5 usability score in testing with 20 participants.',
    tech: ['React', 'OpenWeather API', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1504608524841-42584120d693?w=600&q=80&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
  {
    id: 6,
    title: 'ReadMe — Blog & CMS Platform',
    description: 'A minimal publishing platform with a rich text editor, tag system, reading time estimates, and RSS support.',
    problem: 'Writers needed a distraction-free space to write and publish without technical setup.',
    impact: 'Onboarded 50+ writers in the first month of private beta.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80&fit=crop',
    liveUrl: '#',
    githubUrl: 'https://github.com',
    featured: false,
  },
];

const FILTERS = ['All', 'Featured', 'React', 'TypeScript'] as const;
type Filter = (typeof FILTERS)[number];

export const Projects: React.FC = () => {
  const [active, setActive] = useState<Filter>('All');

  const filtered = PROJECTS.filter((p) => {
    if (active === 'All') return true;
    if (active === 'Featured') return p.featured;
    return p.tech.some((t) => t === active);
  });

  return (
    <section id="projects" className="section-padding bg-[var(--color-surface)]">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-text">My Work</span>
            <div className="divider-line my-3" />
            <h2 className="section-heading">
              Selected{' '}
              <span className="font-display italic font-normal text-[var(--color-text-muted)]">
                projects
              </span>
            </h2>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-body font-semibold tracking-wide transition-all duration-200 ${
                  active === f
                    ? 'bg-[var(--color-accent)] text-charcoal-900'
                    : 'bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-14"
        >
          <p className="body-text mb-4">Want to see more?</p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};
