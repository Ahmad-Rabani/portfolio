import { useEffect, useRef, useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean; // Skip lazy loading for critical images
  blur?: boolean; // Show blur placeholder
}

/**
 * Optimized image component with lazy loading and modern format support
 * Automatically uses WebP with PNG fallback
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  blur = true,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(priority);
  const [imageSrc, setImageSrc] = useState(priority ? src : '');

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, priority]);

  // Convert PNG to WebP path automatically
  const webpSrc = imageSrc.replace(/\.png$/i, '.webp');

  return (
    <picture>
      {imageSrc && (
        <>
          <source srcSet={webpSrc} type="image/webp" />
          <source srcSet={imageSrc} type="image/png" />
        </>
      )}
      <img
        ref={imgRef}
        src={imageSrc || (blur ? 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"%3E%3Crect fill="%23f0f0f0" width="10" height="10"/%3E%3C/svg%3E' : '')}
        alt={alt}
        className={`${className} ${isLoaded ? 'fade-in' : blur ? 'blur-sm' : ''}`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
};

// Style to fade in images
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    animation: fadeIn 0.3s ease-in;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
if (!document.head.querySelector('style[data-fade-in]')) {
  style.setAttribute('data-fade-in', '');
  document.head.appendChild(style);
}
