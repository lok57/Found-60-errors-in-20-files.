import { useEffect } from 'react';
import ParallaxSection from '../components/ParallaxSection';
import FeaturedCollections from '../components/FeaturedCollections';
import TrendingProducts from '../components/TrendingProducts';
import FeatureHighlights from '../components/FeatureHighlights';
import Slider from '../components/Slider';
import ProductSlider from '../components/ProductSlider';

export default function Home() {
  useEffect(() => {
    // Preload background images for smoother parallax
    const images = [
      'https://images.unsplash.com/photo-1445205170230-053b83016050',
      'https://images.unsplash.com/photo-1581338834647-b0fb40704e21',
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da'
    ];

    images.forEach(src => {
      const img = new Image();
      img.src = `${src}?auto=format&fit=crop&q=80&w=3440`;
    });
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <Slider />

      {/* Featured Collections */}
      <ParallaxSection 
        backgroundImage="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=3440"
        className="py-16"
        speed={0.3}
        blur
      >
        <div className="relative">
          <FeaturedCollections />
        </div>
      </ParallaxSection>

      {/* Trending Products */}
      <ParallaxSection 
        backgroundImage="https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&q=80&w=3440"
        className="py-16"
        speed={0.4}
        blur
      >
        <div className="relative">
          <TrendingProducts />
        </div>
      </ParallaxSection>

      {/* Product Slider */}
      <ProductSlider />

      {/* Feature Highlights */}
      <ParallaxSection 
        backgroundImage="https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&q=80&w=3440"
        className="py-16"
        speed={0.3}
        blur
      >
        <div className="relative">
          <FeatureHighlights />
        </div>
      </ParallaxSection>
    </div>
  );
}