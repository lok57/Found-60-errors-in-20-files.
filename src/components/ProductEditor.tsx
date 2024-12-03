import { useState } from 'react';
import { X } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import { Product } from '../types';
import ImageUploader from './ImageUploader';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

interface ProductEditorProps {
  product?: Product;
  onClose: () => void;
  onSave: () => void;
}

export default function ProductEditor({ product, onClose, onSave }: ProductEditorProps) {
  const { addProduct, updateProduct } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>(product || {
    id: uuidv4(),
    name: '',
    price: 0,
    description: '',
    category: '',
    media: [],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const handleMediaChange = (mediaUrls: string[]) => {
    setFormData(prev => ({
      ...prev,
      media: mediaUrls.map(url => ({
        url,
        type: url.startsWith('data:video') ? 'video' : 'image'
      }))
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    // Validate required fields
    if (!formData.name?.trim()) {
      toast.error('Product name is required');
      return;
    }

    if (!formData.price || formData.price <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    if (!formData.description?.trim()) {
      toast.error('Product description is required');
      return;
    }

    if (!formData.category) {
      toast.error('Please select a category');
      return;
    }

    if (!formData.media || formData.media.length === 0) {
      toast.error('Please add at least one product image');
      return;
    }

    try {
      setIsSubmitting(true);

      const productData = {
        ...formData,
        price: typeof formData.price === 'string' 
          ? parseFloat(formData.price) 
          : formData.price,
        updatedAt: new Date().toISOString()
      } as Product;

      if (product) {
        await updateProduct(productData);
        toast.success('Product updated successfully');
      } else {
        addProduct(productData);
        toast.success('Product added successfully');
      }
      
      onSave();
      onClose();
    } catch (error) {
      console.error('Product operation failed:', error);
      toast.error(`Failed to ${product ? 'update' : 'add'} product`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
              type="button"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <ImageUploader
              currentMedia={formData.media?.map(m => m.url)}
              onMediaChange={handleMediaChange}
              maxFiles={5}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className="w-full pl-8 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-accent-500"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent-500"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent-500"
                required
              >
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Watches">Watches</option>
                <option value="Accessories">Accessories</option>
                <option value="Footwear">Footwear</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                id="inStock"
                checked={formData.inStock}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                className="rounded border-gray-300 text-accent-600 focus:ring-accent-500"
              />
              <label htmlFor="inStock" className="text-sm text-gray-700">
                In Stock
              </label>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-accent-600 text-white rounded-md hover:bg-accent-700 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? 'Processing...' 
                  : product 
                    ? 'Update Product' 
                    : 'Add Product'
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}