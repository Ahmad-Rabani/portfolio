import { useEffect, useRef, useState } from 'react';

interface OptimizedBackgroundImageProps {
  src: string;
  className?: string;
  children?: React.ReactNode;
  priority?: boolean;
}

/**
 * Optimized background image with lazy loading and WebP support
 * Ideal for CSS background-image scenarios
 */
export const OptimizedBackgroundImage: React.FC<OptimizedBackgroundImageProps> = ({
  src,
  className = '',
  children,
  priority = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bgImage, setBgImage] = useState(priority ? src : '');
  const [isLoaded, setIsLoaded] = useState(priority);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setBgImage(src);
            // Preload the image
            const img = new Image();
            img.onload = () => setIsLoaded(true);
            img.onerror = () => {
              // Fallback to original if WebP fails
              setBgImage(src);
              setIsLoaded(true);
            };
            
            // Try WebP first
            const webpSrc = src.replace(/\.png$/i, '.webp');
            img.src = webpSrc;
            
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [src, priority]);

  const webpSrc = bgImage.replace(/\.png$/i, '.webp');

  return (
    <div
      ref={containerRef}
      className={`${className} ${isLoaded ? 'bg-loaded' : 'bg-placeholder'}`}
      style={{
        backgroundImage: bgImage ? `url('${webpSrc}'), url('${bgImage}')` : undefined,
        opacity: isLoaded ? 1 : 0.8,
        transition: 'opacity 0.3s ease-in',
      }}
    >
      {children}
    </div>
  );
};
