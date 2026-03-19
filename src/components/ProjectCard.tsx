import { motion } from 'framer-motion';
import { RiExternalLinkLine, RiGithubLine, RiArrowRightLine } from 'react-icons/ri';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group card-base overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-[var(--color-surface)]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 bg-[var(--color-accent)] text-charcoal-900 text-[10px] font-body font-semibold px-2.5 py-1 rounded-full uppercase tracking-widest">
            Featured
          </div>
        )}

        {/* Hover action icons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-charcoal-900 hover:bg-[var(--color-accent)] transition-colors"
              aria-label={`Visit ${project.title} live`}
            >
              <RiExternalLinkLine size={14} />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-charcoal-900 hover:bg-[var(--color-accent)] transition-colors"
            aria-label={`View ${project.title} on GitHub`}
          >
            <RiGithubLine size={14} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[10px] font-body font-semibold px-2 py-0.5 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full uppercase tracking-wider"
            >
              {t}
            </span>
          ))}
        </div>

        <h3 className="font-display text-xl font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
          {project.title}
        </h3>

        <p className="font-body text-sm text-[var(--color-text-muted)] leading-relaxed mb-3">
          {project.description}
        </p>

        {/* Problem / Impact */}
        <div className="space-y-2 mb-5 flex-1">
          <div className="flex gap-2 text-sm">
            <span className="text-[var(--color-accent)] font-semibold shrink-0">Problem</span>
            <span className="text-[var(--color-text-muted)]">{project.problem}</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-[var(--color-text)] font-semibold shrink-0">Impact</span>
            <span className="text-[var(--color-text-muted)]">{project.impact}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4 border-t border-[var(--color-border)]">
          {project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs px-4 py-2.5 flex-1 justify-center"
            >
              Live Demo <RiExternalLinkLine size={13} />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-outline text-xs px-4 py-2.5 ${project.liveUrl === '#' ? 'flex-1 justify-center' : ''}`}
          >
            <RiGithubLine size={14} /> Code
          </a>
          {project.liveUrl === '#' && (
            <button className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors font-body font-medium">
              Details <RiArrowRightLine size={14} />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
};
