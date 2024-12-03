import { useEffect, useState } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ProductRecommendationsProps {
  currentProduct?: Product;
  userHistory?: string[];
}

export default function ProductRecommendations({ 
  currentProduct,
  userHistory 
}: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const getRecommendations = async () => {
      setLoading(true);
      try {
        // Here you would integrate with your AI recommendation service
        // For demo, we'll simulate recommendations
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate AI-generated recommendations
        const mockRecommendations: Product[] = [
          {
            id: '1',
            name: 'Premium Watch',
            price: 299.99,
            description: 'Luxury timepiece with premium features',
            image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49',
            category: 'Watches',
            media: [], // Add empty media array to satisfy Product type
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '2',
            name: 'Designer Sunglasses',
            price: 199.99,
            description: 'Stylish sunglasses for any occasion',
            image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
            category: 'Accessories',
            media: [], // Add empty media array to satisfy Product type
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '3',
            name: 'Leather Wallet',
            price: 89.99,
            description: 'Genuine leather wallet with card slots',
            image: 'https://images.unsplash.com/photo-1627123424574-724758594e93',
            category: 'Accessories',
            media: [], // Add empty media array to satisfy Product type
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];

        setRecommendations(mockRecommendations);
      } catch (error) {
        console.error('Failed to get recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    getRecommendations();
  }, [currentProduct, userHistory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-600"></div>
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Sparkles className="w-6 h-6 text-accent-600" />
          <h2 className="text-2xl font-bold text-center">
            {t('recommendations.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}