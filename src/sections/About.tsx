import { motion } from 'framer-motion';
import { RiCheckLine } from 'react-icons/ri';

const HIGHLIGHTS = [
  'Problem-solving mindset — I break complex challenges into clean, manageable solutions',
  'UI/UX attention — Every pixel matters. I care about how things look and feel to users',
  'Clear communication — I keep stakeholders informed and collaborate well across teams',
  'Continuous learner — I adapt quickly to new technologies and changing requirements',
];

export const About: React.FC = () => {
  return (
    <section id="about" className="section-padding bg-[var(--color-surface)]">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Visual Block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[var(--color-bg)]">
              {/* Decorative content */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full max-w-sm">
                  {/* Code-like visual block */}
                  <div className="card-base p-5 font-mono text-xs leading-relaxed shadow-md">
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                      <span className="ml-2 text-[var(--color-text-muted)] text-[10px]">about.ts</span>
                    </div>
                    <div className="text-[var(--color-text-muted)] space-y-1">
                      <div><span className="text-blue-400">const</span> <span className="text-[var(--color-accent)]">developer</span> = {'{'}</div>
                      <div className="pl-4"><span className="text-green-400">name</span>: <span className="text-orange-400">"Ahmad Ali Rabani"</span>,</div>
                      <div className="pl-4"><span className="text-green-400">role</span>: <span className="text-orange-400">"Frontend Dev"</span>,</div>
                      <div className="pl-4"><span className="text-green-400">passion</span>: <span className="text-orange-400">"Great UX"</span>,</div>
                      <div className="pl-4"><span className="text-green-400">coffee</span>: <span className="text-purple-400">true</span>,</div>
                      <div>{'}'}</div>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {[
                      { val: '2+', label: 'Years' },
                      { val: '15+', label: 'Projects' },
                      { val: '8+', label: 'Clients' },
                    ].map(({ val, label }) => (
                      <div key={label} className="card-base p-3 text-center shadow-sm">
                        <div className="font-display font-bold text-lg text-[var(--color-accent)]">{val}</div>
                        <div className="font-body text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-accent)]/10 rounded-bl-[80px]" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-[var(--color-accent)]/10 rounded-tr-[60px]" />
            </div>
          </motion.div>

          {/* Right — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="label-text">About Me</span>
            <div className="divider-line my-3" />

            <h2 className="section-heading mb-5">
              I turn complex problems{' '}
              <span className="font-display italic font-normal text-[var(--color-text-muted)]">
                into simple
              </span>{' '}
              experiences
            </h2>

            <p className="body-text mb-4">
              Hi, I'm <strong className="text-[var(--color-text)] font-semibold">Ahmad Ali Rabani</strong> — a
              frontend developer who genuinely cares about the people using the products I build. I believe
              the best software is the kind that gets out of the way and just works.
            </p>

            <p className="body-text mb-8">
              With over 2 years of hands-on experience, I specialise in building React-based web applications
              that are fast, accessible, and a pleasure to use. I work closely with designers and product
              teams to bring ideas to life — on time and with quality.
            </p>

            {/* Highlights */}
            <ul className="space-y-3">
              {HIGHLIGHTS.map((text) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center mt-0.5 shrink-0">
                    <RiCheckLine size={12} className="text-[var(--color-accent)]" />
                  </div>
                  <span className="font-body text-sm text-[var(--color-text-muted)] leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
