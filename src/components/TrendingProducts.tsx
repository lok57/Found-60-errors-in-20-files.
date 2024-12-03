import { useState, memo } from 'react';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from './ProductCard';
import ProductLightbox from './ProductLightbox';
import { Product } from '../types';
import { Sparkles } from 'lucide-react';

const TrendingProducts = memo(function TrendingProducts() {
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Get the first 12 products for trending section with new items
  const trendingProducts: Product[] = [
    ...products,
    {
      id: 'new-watch-1',
      name: "Limited Edition Watch",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
      category: "Watches",
      description: "Exclusive limited edition timepiece",
      inStock: true,
      media: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'new-sunglasses-1',
      name: "Designer Sunglasses",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
      category: "Accessories",
      description: "Premium designer sunglasses",
      inStock: true,
      media: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'new-bag-1',
      name: "Leather Crossbody Bag",
      price: 459.99,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      category: "Accessories",
      description: "Handcrafted leather crossbody bag",
      inStock: true,
      media: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'new-sneakers-1',
      name: "Premium Sneakers",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
      category: "Footwear",
      description: "Premium comfort sneakers",
      inStock: true,
      media: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ].slice(0, 12);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        {error}
      </div>
    );
  }

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
  };

  const isNewProduct = (productId: string | number): boolean => {
    return typeof productId === 'string' && productId.startsWith('new-');
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-accent-600" />
            <h2 className="text-3xl font-bold">Trending Products</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular items, handpicked for their exceptional style and quality
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map(product => (
            <div 
              key={product.id}
              className="transform transition-all duration-300 hover:scale-105 relative"
            >
              <ProductCard
                product={product}
                onQuickView={() => handleQuickView(product)}
              />
              {isNewProduct(product.id) && (
                <div className="absolute top-4 left-4 bg-accent-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg z-10">
                  New
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductLightbox
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => {}}
          onAddToWaitlist={() => {}}
        />
      )}
    </section>
  );
});

export default TrendingProducts;