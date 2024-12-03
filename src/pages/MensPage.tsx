import { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import ProductGrid from '../components/ProductGrid';
import ParallaxSection from '../components/ParallaxSection';
import ProductFilters from '../components/ProductFilters';

const filters = [
  {
    id: 'category',
    label: 'Category',
    options: ['Shirts', 'Pants', 'Jackets', 'Accessories']
  },
  {
    id: 'size',
    label: 'Size',
    options: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'color',
    label: 'Color',
    options: ['Black', 'White', 'Blue', 'Gray', 'Green', 'Red']
  },
  {
    id: 'price',
    label: 'Price Range',
    options: ['Under ₹1000', '₹1000-₹2000', '₹2000-₹5000', 'Above ₹5000']
  }
];

export default function MensPage() {
  const { products } = useProducts();
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const handleFilterChange = (filterId: string, values: string[]) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterId]: values
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({});
  };

  const filterProducts = (products: any[]) => {
    return products.filter(product => {
      if (product.category !== 'Men') return false;

      for (const [filterId, selectedValues] of Object.entries(selectedFilters)) {
        if (selectedValues.length === 0) continue;

        switch (filterId) {
          case 'category':
            if (!selectedValues.includes(product.subcategory)) return false;
            break;
          case 'size':
            if (!selectedValues.some(size => product.sizes?.includes(size))) return false;
            break;
          case 'color':
            if (!selectedValues.includes(product.color)) return false;
            break;
          case 'price':
            const price = product.price;
            const matchesPrice = selectedValues.some(range => {
              if (range === 'Under ₹1000') return price < 1000;
              if (range === '₹1000-₹2000') return price >= 1000 && price <= 2000;
              if (range === '₹2000-₹5000') return price >= 2000 && price <= 5000;
              if (range === 'Above ₹5000') return price > 5000;
              return false;
            });
            if (!matchesPrice) return false;
            break;
        }
      }
      return true;
    });
  };

  const filteredProducts = filterProducts(products);

  return (
    <ParallaxSection
      backgroundImage="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=3440&q=80"
      className="min-h-screen pt-16"
      speed={0.3}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          <ProductFilters
            filters={filters}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />
          <div className="text-center mb-12 pt-4">
            <h1 className="text-4xl font-bold text-white mb-2">Men's Collection</h1>
            <p className="text-white/80">Premium Fashion for Men</p>
          </div>
          <ProductGrid
            products={filteredProducts}
            showHeader={false}
          />
        </div>
      </div>
    </ParallaxSection>
  );
}