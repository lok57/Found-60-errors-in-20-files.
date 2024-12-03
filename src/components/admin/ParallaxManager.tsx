import { useState, useRef } from 'react';
import { Trash2, Image as ImageIcon, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface ParallaxImage {
  id: string;
  url: string;
  name: string;
  section: string;
  active: boolean;
}

export default function ParallaxManager() {
  const [images, setImages] = useState<ParallaxImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedSection, setSelectedSection] = useState('home');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setIsUploading(true);

    try {
      const newImages = await Promise.all(
        files.map(async (file) => {
          if (!file.type.startsWith('image/')) {
            throw new Error('Please upload image files only');
          }

          // Create base64 preview
          const preview = await createImagePreview(file);

          return {
            id: crypto.randomUUID(),
            url: preview,
            name: file.name,
            section: selectedSection,
            active: true
          };
        })
      );

      setImages(current => [...current, ...newImages]);
      toast.success('Images uploaded successfully');

    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload images');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const createImagePreview = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        resolve(reader.result as string);
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    setImages(current => current.filter(img => img.id !== id));
    toast.success('Image removed');
  };

  const toggleImageActive = (id: string) => {
    setImages(current =>
      current.map(img =>
        img.id === id ? { ...img, active: !img.active } : img
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Parallax Backgrounds</h2>

      {/* Section Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Section
        </label>
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500"
        >
          <option value="home">Homepage</option>
          <option value="about">About Us</option>
          <option value="men">Men's Collection</option>
          <option value="women">Women's Collection</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-8">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          id="parallax-image-upload"
          multiple
        />
        <label
          htmlFor="parallax-image-upload"
          className="cursor-pointer flex flex-col items-center space-y-2"
        >
          <div className="p-4 bg-accent-50 rounded-full">
            <ImageIcon className="w-8 h-8 text-accent-600" />
          </div>
          <span className="text-sm text-gray-600">
            {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
          </span>
          <span className="text-xs text-gray-500">
            Supports: JPG, PNG, WebP (Recommended size: 3440x1440)
          </span>
        </label>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images
          .filter(img => img.section === selectedSection)
          .map((image) => (
            <div key={image.id} className="relative group">
              <div className={`relative aspect-video rounded-lg overflow-hidden ${
                !image.active ? 'opacity-50' : ''
              }`}>
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => toggleImageActive(image.id)}
                      className="p-1 bg-white rounded-full hover:bg-gray-100"
                      title={image.active ? 'Deactivate' : 'Activate'}
                    >
                      {image.active ? (
                        <X className="w-4 h-4" />
                      ) : (
                        <ImageIcon className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => removeImage(image.id)}
                      className="p-1 bg-white rounded-full hover:bg-gray-100"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500 truncate">{image.name}</p>
            </div>
          ))}
      </div>

      {/* Empty State */}
      {images.filter(img => img.section === selectedSection).length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No images uploaded yet</p>
        </div>
      )}
    </div>
  );
}