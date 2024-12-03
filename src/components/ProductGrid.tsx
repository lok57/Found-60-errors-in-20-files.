import { useState } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import ProductLightbox from './ProductLightbox';

interface ProductGridProps {
  title: string;
  description: string;
  products: Product[];
  isAdmin?: boolean;
  onUpdateProduct?: (product: Product) => Promise<void>; // Make sure this returns a Promise
  onDeleteProduct?: (productId: string) => Promise<void>; // Make sure this returns a Promise
}

export default function ProductGrid({
  title,
  description,
  products,
  isAdmin,
  onUpdateProduct,
  onDeleteProduct,
}: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = () => {
    // Example: Add your logic to handle the cart action
    console.log('Product added to cart:', selectedProduct);
  };

  const handleAddToWaitlist = () => {
    // Example: Add your logic to handle the waitlist action
    console.log('Product added to waitlist:', selectedProduct);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
        <p className="text-xl text-white/80">{description}</p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isAdmin={isAdmin}
            onUpdate={onUpdateProduct}
            onDelete={onDeleteProduct}
            onQuickView={handleQuickView}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/70">No products found in this category.</p>
        </div>
      )}

      {selectedProduct && (
        <ProductLightbox
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart} // Add your add to cart functionality here
          onAddToWaitlist={handleAddToWaitlist} // Add your add to waitlist functionality here
        />
      )}
    </div>
  );
}
