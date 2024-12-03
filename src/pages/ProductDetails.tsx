import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../services/api';
import { formatPrice } from '../lib/utils';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) throw new Error('Product ID is required');
        const data = await getProduct(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    toast.success('Added to cart!');
  };

  if (loading) return <div className="flex justify-center pt-20">Loading...</div>;
  if (error) return <div className="text-red-500 pt-20">{error}</div>;
  if (!product) return <div className="pt-20">Product not found</div>;

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-8"
            />
          </div>
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-2xl font-semibold">{formatPrice(product.price)}</p>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="space-y-4">
              <button 
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center space-x-2 bg-accent-600 text-white px-8 py-4 rounded-full hover:bg-accent-700 transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 border border-accent-600 text-accent-600 px-8 py-4 rounded-full hover:bg-accent-50 transition-colors">
                <Heart className="h-5 w-5" />
                <span>Add to Wishlist</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}