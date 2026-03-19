import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds: string[]): string => {
  const [active, setActive] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActive(sectionIds[i]);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return active;
};
