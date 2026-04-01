import { motion } from 'framer-motion';
import {
  RiReactjsLine,
  RiJavascriptLine,
  RiHtml5Line,
  RiCss3Line,
  RiGitBranchLine,
  RiCodeSSlashLine,
  RiLayout2Line,
  RiSmartphoneLine,
  RiAppsLine,
  RiTerminalBoxLine,
  RiGlobalLine,
} from 'react-icons/ri';
import { SiTypescript, SiTailwindcss, SiVite, SiNextdotjs, SiAntdesign, SiMui, SiStyledcomponents, SiBitbucket } from 'react-icons/si';

interface SkillItem {
  name: string;
  icon: React.ReactNode;
  level: number; // 1–5
}

interface SkillGroup {
  category: string;
  description: string;
  skills: SkillItem[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Frontend Development',
    description: 'Core technologies I use daily to build interfaces',
    skills: [
      { name: 'React', icon: <RiReactjsLine size={22} />, level: 5 },
      { name: 'TypeScript', icon: <SiTypescript size={18} />, level: 4 },
      { name: 'JavaScript', icon: <RiJavascriptLine size={22} />, level: 5 },
      { name: 'HTML5', icon: <RiHtml5Line size={22} />, level: 5 },
      { name: 'CSS3', icon: <RiCss3Line size={22} />, level: 5 },
      { name: 'Next.js', icon: <SiNextdotjs size={18} />, level: 4 },
      { name: 'Vite', icon: <SiVite size={18} />, level: 4 },
    ],
  },
  {
    category: 'Styling & State Management',
    description: 'Tools for beautiful UIs and predictable state handling',
    skills: [
      { name: 'Tailwind CSS', icon: <SiTailwindcss size={18} />, level: 5 },
      { name: 'Bootstrap', icon: <RiLayout2Line size={22} />, level: 4 },
      { name: 'Styled Components', icon: <SiStyledcomponents size={18} />, level: 4 },
      { name: 'Redux', icon: <RiCodeSSlashLine size={22} />, level: 4 },
      { name: 'Context API', icon: <RiAppsLine size={22} />, level: 5 },
    ],
  },
  {
    category: 'Component Libraries',
    description: 'UI frameworks for building polished interfaces',
    skills: [
      { name: 'Ant Design', icon: <SiAntdesign size={18} />, level: 5 },
      { name: 'Material-UI (MUI)', icon: <SiMui size={18} />, level: 4 },
    ],
  },
  {
    category: 'Tools & Services',
    description: 'Development workflow and backend integration',
    skills: [
      { name: 'Git & GitHub', icon: <RiGitBranchLine size={22} />, level: 5 },
      { name: 'REST APIs', icon: <RiGlobalLine size={22} />, level: 5 },
      { name: 'Bitbucket', icon: <SiBitbucket size={18} />, level: 3 },
      { name: 'Azure', icon: <RiTerminalBoxLine size={22} />, level: 3 },
      { name: 'Firebase', icon: <RiSmartphoneLine size={22} />, level: 3 },
    ],
  },
];

const LevelDots: React.FC<{ level: number }> = ({ level }) => (
  <div className="flex gap-0.5 mt-2">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className={`h-1 flex-1 rounded-full transition-colors ${
          i <= level ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'
        }`}
      />
    ))}
  </div>
);

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="label-text">Expertise</span>
          <div className="divider-line my-3" />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="section-heading">
              Skills &{' '}
              <span className="font-display italic font-normal text-[var(--color-text-muted)]">
                technologies
              </span>
            </h2>
            <p className="body-text text-sm max-w-xs">
              Focused on the frontend, with a strong eye for polish and performance.
            </p>
          </div>
        </motion.div>

        {/* Skill Groups */}
        <div className="space-y-12">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Group header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
                <h3 className="font-body font-semibold text-base text-[var(--color-text)]">
                  {group.category}
                </h3>
                <div className="hidden sm:block flex-1 h-px bg-[var(--color-border)]" />
                <p className="text-sm text-[var(--color-text-muted)] font-body">
                  {group.description}
                </p>
              </div>

              {/* Skills grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {group.skills.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: gi * 0.05 + si * 0.04 }}
                    whileHover={{ y: -3 }}
                    className="card-base p-4 group hover:border-[var(--color-accent)]/40 hover:shadow-md transition-all duration-200"
                  >
                    <div className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors mb-2">
                      {skill.icon}
                    </div>
                    <div className="font-body font-medium text-xs text-[var(--color-text)] leading-tight">
                      {skill.name}
                    </div>
                    <LevelDots level={skill.level} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex items-center gap-3 text-sm text-[var(--color-text-muted)] font-body"
        >
          <div className="flex gap-2 items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-1 text-xs">
                <div className={`w-3 h-1 rounded-full ${i <= 3 ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'}`} />
              </div>
            ))}
          </div>
          <span>Proficiency: 1 bar = learning, 5 bars = expert</span>
        </motion.div>
      </div>
    </section>
  );
};
