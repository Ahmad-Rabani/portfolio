import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  RiMailLine,
  RiLinkedinBoxLine,
  RiGithubLine,
  RiArrowRightLine,
  RiCheckLine,
  RiSendPlane2Line,
} from 'react-icons/ri';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormState = { name: '', email: '', subject: '', message: '' };

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'ahmadalirabani07@gmail.com',
    href: 'mailto:ahmadalirabani07@gmail.com',
    icon: <RiMailLine size={20} />,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/ahmad-ali-rabani',
    href: 'https://www.linkedin.com/in/ahmad-ali-rabani-879a12256/',
    icon: <RiLinkedinBoxLine size={20} />,
  },
  {
    label: 'GitHub',
    value: 'github.com/Ahmad-Rabani',
    href: 'https://github.com/Ahmad-Rabani',
    icon: <RiGithubLine size={20} />,
  },
];

export const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init('mClvHJ9U4ylXN8FyT');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);
    setError(null);

    try {
      await emailjs.send('service_r4p6v7k', 'template_8h5p9m2', {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject || 'Portfolio Contact',
        message: form.message,
        to_email: 'ahmadalirabani07@gmail.com',
      });

      setSubmitted(true);
      setForm(INITIAL_FORM);
    } catch (err) {
      setError('Failed to send message. Please try again or email me directly.');
      console.error('EmailJS error:', err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full font-body text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all duration-200';

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="label-text">Get In Touch</span>
          <div className="flex justify-center my-3">
            <div className="divider-line" />
          </div>
          <h2 className="section-heading mb-3">
            Let's build something{' '}
            <span className="text-[var(--color-accent)] font-display italic">
              amazing together
            </span>
          </h2>
          <p className="body-text max-w-xl mx-auto">
            Whether you have a project in mind, a role to discuss, or just want to say hi —
            my inbox is always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="card-base p-8"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center mb-5">
                  <RiCheckLine size={32} className="text-[var(--color-accent)]" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[var(--color-text)] mb-2">
                  Message sent!
                </h3>
                <p className="body-text text-sm">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm(INITIAL_FORM); }}
                  className="mt-6 text-sm font-body font-medium text-[var(--color-accent)] hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-body font-medium text-[var(--color-text)] mb-1.5 uppercase tracking-wider">
                      Name *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ahmad Ali Rabani"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body font-medium text-[var(--color-text)] mb-1.5 uppercase tracking-wider">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="hello@company.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <lab

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm font-body text-red-500">{error}</p>
                  </div>
                )}el className="block text-xs font-body font-medium text-[var(--color-text)] mb-1.5 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project opportunity / Question / etc."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-body font-medium text-[var(--color-text)] mb-1.5 uppercase tracking-wider">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, and how I can help..."
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !form.name || !form.email || !form.message}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-charcoal-900/30 border-t-charcoal-900 rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <RiSendPlane2Line size={16} />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>

          {/* Right — Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {/* Availability badge */}
            <div className="card-base p-5 bg-[var(--color-accent)]/5 border-[var(--color-accent)]/20">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-body font-semibold text-[var(--color-text)] uppercase tracking-widest">
                  Available Now
                </span>
              </div>
              <p className="text-sm font-body text-[var(--color-text-muted)]">
                Open to full-time roles and freelance projects. Response time: usually within 24h.
              </p>
            </div>

            {/* Contact links */}
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="card-base p-5 flex items-center gap-4 hover:border-[var(--color-accent)]/40 hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] shrink-0 group-hover:bg-[var(--color-accent)] group-hover:text-charcoal-900 transition-all duration-200">
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-body font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-0.5">
                    {link.label}
                  </p>
                  <p className="text-sm font-body font-medium text-[var(--color-text)] truncate">
                    {link.value}
                  </p>
                </div>
                <RiArrowRightLine
                  size={16}
                  className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all duration-200 shrink-0"
                />
              </a>
            ))}

            {/* Quote */}
            <div className="card-base p-5 relative overflow-hidden">
              <div className="font-display text-5xl text-[var(--color-accent)]/20 leading-none mb-2 select-none">
                "
              </div>
              <p className="font-display italic text-base text-[var(--color-text-muted)] leading-relaxed">
                Good design is about making things that are useful, beautiful, and right.
              </p>
              <p className="font-body text-xs text-[var(--color-text-muted)] mt-3 font-medium">
                — A mindset I live by
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
