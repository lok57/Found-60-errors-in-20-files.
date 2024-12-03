import { useProducts } from '../contexts/ProductContext';
import ProductGrid from '../components/ProductGrid';
import ParallaxSection from '../components/ParallaxSection';

export default function WatchesPage() {
  const { products } = useProducts();
  const watchProducts = products.filter(product => product.category === 'Watches');

  return (
    <ParallaxSection
      backgroundImage="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=3440&q=80"
      className="min-h-screen pt-16"
      speed={0.3}
    >
      <ProductGrid
        title="Luxury Timepieces"
        description="Discover Our Collection of Premium Watches"
        products={watchProducts}
      />
    </ParallaxSection>
  );
}