import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Men's Collection",
    subtitle: "Spring/Summer 2024",
    description: "Discover our latest collection of premium menswear",
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=3440&q=80",
  },
  {
    id: 2,
    title: "Women's Fashion",
    subtitle: "New Arrivals",
    description: "Elegant styles for the modern woman",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=3440&q=80",
  },
  {
    id: 3,
    title: "Luxury Watches",
    subtitle: "Timeless Elegance",
    description: "Premium timepieces for every occasion",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=3440&q=80",
  }
];

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((current) => (current + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((current) => 
      current === 0 ? slides.length - 1 : current - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="relative h-[800px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-[2000ms]"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              transform: index === currentSlide ? 'scale(1)' : 'scale(1.05)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60">
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-white px-4 max-w-4xl mx-auto">
                <p className="text-sm uppercase tracking-wider mb-2 opacity-0 animate-[slideDown_1s_ease-out_0.5s_forwards]">
                  {slide.subtitle}
                </p>
                <h2 className="text-6xl sm:text-7xl font-bold mb-4 opacity-0 animate-[slideDown_1s_ease-out_0.7s_forwards]">
                  {slide.title}
                </h2>
                <p className="text-xl mb-8 opacity-0 animate-[slideDown_1s_ease-out_0.9s_forwards]">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-10"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-10"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}