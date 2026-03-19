import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowUpLine } from 'react-icons/ri';
import { scrollToTop } from '../utils/scrollTo';

export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-[var(--color-accent)] text-charcoal-900 rounded-full flex items-center justify-center shadow-lg"
          aria-label="Scroll to top"
        >
          <RiArrowUpLine size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
