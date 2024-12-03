import { useEffect, useState } from 'react';

interface ParallaxBackgroundProps {
  images: {
    url: string;
    speed: number;
    startFade?: number;
    endFade?: number;
  }[];
}

export default function ParallaxBackground({ images }: ParallaxBackgroundProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      {images.map((image, index) => (
        <div 
          key={index}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url("${image.url}")`,
            transform: `translateY(${scrollY * image.speed}px)`,
            opacity: image.startFade && image.endFade
              ? Math.max(0, Math.min(1, 
                  (scrollY - image.startFade) / (image.endFade - image.startFade)
                ))
              : 1
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
    </div>
  );
}