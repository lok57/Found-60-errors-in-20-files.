import { useEffect, useState } from 'react';

export const ParallaxBackground = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: `translate(${offset.x * 0.5}px, ${offset.y * 0.5}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {/* Replace this URL with your video URL once hosted */}
        <source src="/path-to-your-video.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/50 to-purple-900/40 backdrop-blur-[2px]"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              opacity: 0.1,
              transform: `translate(${offset.x * ((i % 3) + 1)}px, ${
                offset.y * ((i % 3) + 1)
              }px)`,
              transition: 'transform 0.2s ease-out',
            }}
          />
        ))}
      </div>
    </div>
  );
};
