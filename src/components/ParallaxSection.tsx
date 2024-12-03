import { useEffect, useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  backgroundImage: string;
  speed?: number;
  blur?: boolean;
  className?: string;
}

export default function ParallaxSection({ 
  children, 
  backgroundImage, 
  speed = 0.5,
  blur = false,
  className = ''
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    if (!section || !background) return;

    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const scrolled = window.scrollY;
        const sectionTop = rect.top + scrolled;
        const offset = (scrolled - sectionTop) * speed;

        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          background.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-cover bg-center -z-10 will-change-transform"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          transform: 'translate3d(0, 0, 0)'
        }}
      />
      {blur && (
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-[1px] -z-10"
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}