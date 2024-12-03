import React from 'react';
import ProductGrid from '../../components/ProductGrid';
import { useProducts } from '../../contexts/ProductContext';
import { Product } from '../../types';

interface PantsPageProps {
  onAddToCart: (product: Product, size: string) => void;
  onAddToWaitlist: (product: Product, email: string, size: string) => void;
  isAdmin?: boolean;
}

export default function PantsPage({ onAddToCart, onAddToWaitlist, isAdmin }: PantsPageProps) {
  const { products, updateProduct } = useProducts();
  const pants = products.filter(p => p.category === 'Men' && p.subcategory === 'Pants');

  return (
    <ProductGrid
      title="Men's Pants"
      description="Comfortable and stylish pants collection"
      heroImage="https://images.unsplash.com/photo-1473966968600-fa801b869a1a"
      products={pants}
      onAddToCart={onAddToCart}
      onAddToWaitlist={onAddToWaitlist}
      isAdmin={isAdmin}
      onProductUpdate={updateProduct}
    />
  );
}