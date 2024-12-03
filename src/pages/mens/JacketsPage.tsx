import React from 'react';
import ProductGrid from '../../components/ProductGrid';
import { useProducts } from '../../contexts/ProductContext';
import { Product } from '../../types';

interface JacketsPageProps {
  onAddToCart: (product: Product, size: string) => void;
  onAddToWaitlist: (product: Product, email: string, size: string) => void;
  isAdmin?: boolean;
}

export default function JacketsPage({ onAddToCart, onAddToWaitlist, isAdmin }: JacketsPageProps) {
  const { products, updateProduct } = useProducts();
  const jackets = products.filter(p => p.category === 'Men' && p.subcategory === 'Jackets');

  return (
    <ProductGrid
      title="Men's Jackets"
      description="Premium jackets and outerwear"
      heroImage="https://images.unsplash.com/photo-1551028719-00167b16eac5"
      products={jackets}
      onAddToCart={onAddToCart}
      onAddToWaitlist={onAddToWaitlist}
      isAdmin={isAdmin}
      onProductUpdate={updateProduct}
    />
  );
}