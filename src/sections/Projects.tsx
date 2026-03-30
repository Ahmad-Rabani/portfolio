import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '../components/ProjectCard';
import type { Project } from '../types';

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Sianty — Garage Management System',
    description: 'A comprehensive multi-module web application designed to streamline garage operations from vehicle intake and inspections through job management, invoicing, and customer communication.',
    problem: 'Garage operations were fragmented across multiple disconnected systems, leading to inefficiencies in job tracking and customer management.',
    impact: 'Streamlined garage workflows, improved job tracking accuracy, and enhanced customer communication capabilities.',
    tech: ['React', 'TypeScript', 'Ant Design'],
    image: '/project%20images/sianty.png',
    liveUrl: 'http://dev1.sianty.com/#/login',
    featured: true,
  },
  {
    id: 2,
    title: 'WMS — Warehouse Management System',
    description: 'An integrated warehouse management solution providing real-time inventory tracking, order fulfillment automation, and comprehensive reporting capabilities.',
    problem: 'Manual warehouse operations resulted in inventory discrepancies and delayed order fulfillment.',
    impact: 'Reduced inventory errors by 85% and improved order processing efficiency.',
    tech: ['React', 'TypeScript', 'Ant Design'],
    image: '/project%20images/WMS.png',
    liveUrl: 'https://nc.eutsol.ca/eut/auth/login',
    featured: true,
  },
  {
    id: 3,
    title: 'Weather App',
    description: 'A real-time weather forecasting application with current conditions, 7-day forecasts, and location-based weather data. Features interactive maps and detailed meteorological information.',
    problem: 'Users needed a clean, intuitive way to access accurate weather information without cluttered interfaces.',
    impact: 'Provides accurate weather data with intuitive UI, helping users plan their day effectively.',
    tech: ['React', 'API Integration', 'Tailwind CSS'],
    image: '/project%20images/weather-app.png',
    liveUrl: 'https://weather-app-plum-one-90.vercel.app/',
    githubUrl: 'https://github.com/Ahmad-Rabani/weather-app',
    featured: false,
  },
  {
    id: 4,
    title: 'Cosmetics Product Website',
    description: 'A modern e-commerce platform showcasing cosmetics products with browsable catalogs, product details, and seamless shopping experience.',
    problem: 'Cosmetics retailers needed an engaging online presence to showcase products and drive sales.',
    impact: 'Increased product visibility and improved customer engagement with intuitive product browsing.',
    tech: ['React', 'Tailwind CSS', 'JavaScript'],
    image: '/project%20images/cosmetics-website.png',
    liveUrl: 'https://tech-solutions-task-z2xj.vercel.app/#',
    githubUrl: 'https://github.com/Ahmad-Rabani/Tech-solutions-task',
    featured: false,
  },
  {
    id: 5,
    title: 'Dental Website Landing Page',
    description: 'A professional landing page for a dental practice featuring services, doctor profiles, appointment booking, and patient testimonials.',
    problem: 'Dental practices needed a professional online presence to attract patients and communicate services effectively.',
    impact: 'Established online credibility and streamlined patient inquiries through professional design.',
    tech: ['React', 'Tailwind CSS', 'HTML'],
    image: '/project%20images/dental-website.png',
    liveUrl: 'https://doctors-landing-page-qsa7.vercel.app/',
    githubUrl: 'https://github.com/Ahmad-Rabani/Doctors-landing-page',
    featured: false,
  },
  {
    id: 6,
    title: 'Dynamic Email Template Dashboard',
    description: 'An interactive dashboard application for creating, previewing, and managing dynamic email templates with real-time rendering capabilities.',
    problem: 'Email marketers needed an easy way to design and preview email templates without coding.',
    impact: 'Simplified email template creation process, reducing design-to-deployment time significantly.',
    tech: ['React', 'JavaScript', 'Bootstrap'],
    image: '/project%20images/email-dashboard.png',
    liveUrl: 'https://dashboardapp-kb5m.vercel.app/',
    githubUrl: 'https://github.com/Ahmad-Rabani/dashboardapp',
    featured: false,
  },
  {
    id: 7,
    title: 'Notes App',
    description: 'A feature-rich notes and task management application allowing users to create, organize, and manage their notes with categories and priorities.',
    problem: 'Users needed a simple yet powerful tool to organize thoughts, tasks, and notes in one place.',
    impact: 'Improved productivity with easy-to-use note management and task tracking capabilities.',
    tech: ['React', 'JavaScript', 'Local Storage'],
    image: '/project%20images/notes-app.png',
    liveUrl: 'https://todo-react-nine-woad.vercel.app/home',
    githubUrl: 'https://github.com/Ahmad-Rabani/Notes-React',
    featured: false,
  },
  {
    id: 8,
    title: 'Garage CMS',
    description: 'A comprehensive content management system for garage operations, enabling administrators to manage services, pricing, inventory, and customer data from a centralized dashboard.',
    problem: 'Garage managers needed an intuitive admin interface to manage business operations and content efficiently.',
    impact: 'Streamlined administrative workflows and reduced management overhead for garage operations.',
    tech: ['React', 'TypeScript', 'Ant Design'],
    image: '/project%20images/CMS.png',
    liveUrl: 'http://dev2.sianty.com',
    featured: false,
  },
  {
    id: 9,
    title: 'Garage Customer App',
    description: 'A customer-facing mobile web application for garage services, allowing customers to book appointments, track service status, and manage their vehicle records.',
    problem: 'Customers needed a convenient way to book services and track their garage work without phone calls.',
    impact: 'Increased customer engagement and improved service booking efficiency through self-service platform.',
    tech: ['React', 'TypeScript', 'Ant Design'],
    image: '/project%20images/Customer.png',
    liveUrl: 'http://158.180.46.230:3006/login',
    featured: false,
  },
];

const FILTERS = ['All', 'Featured', 'React', 'Ant Design', 'Tailwind CSS'] as const;
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
