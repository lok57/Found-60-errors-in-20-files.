import React from 'react';
import ProductGrid from '../../components/ProductGrid';
import { useProducts } from '../../contexts/ProductContext';
import { Product } from '../../types';

interface ShirtsPageProps {
  onAddToCart: (product: Product, size: string) => void;
  onAddToWaitlist: (product: Product, email: string, size: string) => void;
  isAdmin?: boolean;
}

export default function ShirtsPage({ onAddToCart, onAddToWaitlist, isAdmin }: ShirtsPageProps) {
  const { products, updateProduct } = useProducts();
  const shirts = products.filter(p => p.category === 'Men' && p.subcategory === 'Shirts');

  return (
    <ProductGrid
      title="Men's Shirts"
      description="Premium shirts for every occasion"
      heroImage="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf"
      products={shirts}
      onAddToCart={onAddToCart}
      onAddToWaitlist={onAddToWaitlist}
      isAdmin={isAdmin}
      onProductUpdate={updateProduct}
    />
  );
}