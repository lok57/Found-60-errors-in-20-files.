import { useState } from 'react';
import { Heart, Edit2, Save, X, Trash2, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useLocale } from '../contexts/LocaleContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
  onUpdate?: (product: Product) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ 
  product, 
  isAdmin, 
  onUpdate, 
  onDelete,
  onQuickView 
}: ProductCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const [isHovered, setIsHovered] = useState(false);
  const { formatPrice } = useLocale();

  const mainImage = product.media?.[0]?.url || product.image || 'https://via.placeholder.com/400';

  const handleSave = async () => {
    if (!onUpdate) return;

    try {
      await onUpdate(editedProduct);
      setIsEditing(false);
      toast.success('Product updated successfully');
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const handleDelete = async () => {
    if (!onDelete || !window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await onDelete(product.id);
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <h3 className="font-medium text-gray-900 dark:text-white">Edit Product</h3>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="p-2 rounded-full bg-accent-600 text-white hover:bg-accent-700 transition-colors"
              title="Save changes"
            >
              <Save className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                setEditedProduct(product);
                setIsEditing(false);
              }}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title="Cancel editing"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-accent-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) => setEditedProduct({ 
                ...editedProduct, 
                price: parseFloat(e.target.value) || 0 
              })}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-accent-500"
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea
              value={editedProduct.description}
              onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-accent-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select
              value={editedProduct.category}
              onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-accent-500"
            >
              <option value="Electronics">Electronics</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Watches">Watches</option>
              <option value="Accessories">Accessories</option>
              <option value="Footwear">Footwear</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300"
      onMouseEnter={() => !isAdmin && setIsHovered(true)}
      onMouseLeave={() => !isAdmin && setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {isAdmin && (
          <div className="absolute top-4 right-4 z-20 flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 bg-accent-600 text-white rounded-full hover:bg-accent-700 transition-colors"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}

        {!isAdmin && (
          <>
            <div className="absolute top-4 right-4 z-10">
              <button
                className={`rounded-full p-2 transition-colors ${
                  isHovered ? 'bg-white text-accent-600' : 'bg-white/90 text-gray-600'
                }`}
              >
                <Heart className="h-4 w-4" />
              </button>
            </div>

            <div 
              className={`absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="space-y-3">
                <button
                  onClick={() => onQuickView?.(product)}
                  className="flex items-center justify-center space-x-2 bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>Quick View</span>
                </button>
                <button
                  className="flex items-center justify-center space-x-2 bg-accent-600 text-white px-6 py-2 rounded-full hover:bg-accent-700 transition-colors w-full"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
            {product.name}
          </h3>
          <span className="text-sm font-medium text-accent-600 dark:text-accent-400 bg-accent-50 dark:bg-accent-900/20 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{product.description}</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
}