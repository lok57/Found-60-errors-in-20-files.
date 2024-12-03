import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Product } from '../types';
import { mensProducts, womensProducts, kidsProducts, watchesProducts } from '../data/products';

// Convert USD prices to INR (approximate conversion rate: 1 USD = 75 INR)
const convertToINR = (products: Product[]) => {
  return products.map(product => ({
    ...product,
    price: typeof product.price === 'string' 
      ? parseFloat(product.price.replace(/[^0-9.-]+/g, '')) * 75
      : product.price * 75
  }));
};

// Combine all initial products with INR prices
const initialProducts: Product[] = [
  ...convertToINR(mensProducts),
  ...convertToINR(womensProducts),
  ...convertToINR(kidsProducts),
  ...convertToINR(watchesProducts)
];

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  getProductsByCategory: (category: string) => Product[];
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : initialProducts;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveProductsToStorage = (products: Product[]) => {
    localStorage.setItem('products', JSON.stringify(products));
  };

  const addProduct = useCallback((product: Product) => {
    const newProduct = {
      ...product,
      id: String(Date.now()),
      inStock: true,
      sizes: product.sizes || ['S', 'M', 'L', 'XL']
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    saveProductsToStorage(updatedProducts);
  }, [products]);

  const updateProduct = useCallback((updatedProduct: Product) => {
    const updatedProducts = products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    saveProductsToStorage(updatedProducts);
  }, [products]);

  const deleteProduct = useCallback((productId: string) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    saveProductsToStorage(updatedProducts);
  }, [products]);

  const getProductsByCategory = useCallback((category: string) => {
    return products.filter(product => 
      category === 'All' ? true : product.category === category
    );
  }, [products]);

  const refreshProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        setProducts(initialProducts);
      }
    } catch (err) {
      setError('Failed to refresh products');
      console.error('Error refreshing products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    refreshProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}