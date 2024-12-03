import { useProducts } from '../contexts/ProductContext';
import ProductGrid from '../components/ProductGrid';
import ParallaxSection from '../components/ParallaxSection';

export default function ElectronicsPage() {
  const { products } = useProducts();
  const electronicsProducts = products.filter(product => product.category === 'Electronics');

  return (
    <ParallaxSection
      backgroundImage="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=3440&q=80"
      className="min-h-screen pt-16"
      speed={0.3}
    >
      <ProductGrid
        title="Electronics"
        description="Latest Tech & Gadgets"
        products={electronicsProducts}
      />
    </ParallaxSection>
  );
}