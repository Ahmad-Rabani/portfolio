import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const CURSOR_SIZE = 20;

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Detect touch device and disable custom cursor on touch
  useEffect(() => {
    const isTouchDevice = () => {
      return (
        (typeof window !== 'undefined' &&
          ('ontouchstart' in window ||
            (navigator.maxTouchPoints || 0) > 0))
      );
    };

    if (isTouchDevice()) {
      return;
    }

    // Hide default cursor
    document.documentElement.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handlePointerEnter = (e: Event) => {
      const target = (e as PointerEvent).target;
      if (!(target instanceof HTMLElement)) {
        setIsHovering(false);
        return;
      }

      const isClickable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button, a, [role="button"], .cursor-pointer') !== null ||
        Boolean(target.onclick) ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(isClickable);
    };

    const handlePointerLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('pointerover', handlePointerEnter, { passive: true });
    document.addEventListener('pointerenter', handlePointerEnter, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('pointerover', handlePointerEnter);
      document.removeEventListener('pointerenter', handlePointerEnter);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.documentElement.style.cursor = 'auto';
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed z-[9999]"
      style={{
        x: mousePosition.x - CURSOR_SIZE / 2,
        y: mousePosition.y - CURSOR_SIZE / 2,
      }}
      animate={{
        scale: isHovering ? 0.8 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      {/* Outer dotted circle */}
      <div
        className="absolute inset-0 rounded-full border-2 border-dashed transition-colors duration-200"
        style={{
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          borderColor: isHovering ? 'var(--color-accent)' : 'var(--color-text)',
          opacity: isHovering ? 1 : 0.6,
        }}
      />

      {/* Inner dot */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200"
        style={{
          width: isHovering ? 4 : 3,
          height: isHovering ? 4 : 3,
          backgroundColor: isHovering ? 'var(--color-accent)' : 'var(--color-text)',
          opacity: isHovering ? 1 : 0.8,
        }}
      />
    </motion.div>
  );
};
