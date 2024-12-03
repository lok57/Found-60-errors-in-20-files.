import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface ParallaxImage {
  id: string;
  url: string;
  name: string;
  pageId: string;
  active: boolean;
  order: number;
  createdAt: string;
}

interface ParallaxContextType {
  images: ParallaxImage[];
  addImages: (files: File[], pageId: string) => Promise<void>;
  removeImage: (id: string) => void;
  toggleImageActive: (id: string) => void;
  reorderImages: (pageId: string, fromIndex: number, toIndex: number) => void;
  getActiveImagesForPage: (pageId: string) => ParallaxImage[];
  loading: boolean;
}

const ParallaxContext = createContext<ParallaxContextType | undefined>(undefined);

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export function ParallaxProvider({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<ParallaxImage[]>(() => {
    const savedImages = localStorage.getItem('parallax_images');
    return savedImages ? JSON.parse(savedImages) : [];
  });
  const [loading, setLoading] = useState(false);

  // Save images to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('parallax_images', JSON.stringify(images));
  }, [images]);

  const addImages = async (files: File[], pageId: string) => {
    setLoading(true);
    try {
      const newImages = await Promise.all(
        files.map(async (file) => {
          // Validate file size
          if (file.size > MAX_FILE_SIZE) {
            throw new Error(`File ${file.name} exceeds 50MB limit`);
          }

          // Validate file type
          if (!file.type.startsWith('image/')) {
            throw new Error(`File ${file.name} is not an image`);
          }

          // Convert to base64
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });

          return {
            id: crypto.randomUUID(),
            url: base64,
            name: file.name,
            pageId,
            active: true,
            order: images.filter(img => img.pageId === pageId).length,
            createdAt: new Date().toISOString()
          };
        })
      );

      setImages(current => [...current, ...newImages]);
      toast.success('Images uploaded successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload images');
      throw error;
    } finally {
      setLoading(false);
    }
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
    toast.success('Image status updated');
  };

  const reorderImages = (pageId: string, fromIndex: number, toIndex: number) => {
    setImages(current => {
      const pageImages = current.filter(img => img.pageId === pageId);
      const otherImages = current.filter(img => img.pageId !== pageId);
      
      const [movedItem] = pageImages.splice(fromIndex, 1);
      pageImages.splice(toIndex, 0, movedItem);
      
      const reorderedPageImages = pageImages.map((img, index) => ({
        ...img,
        order: index
      }));

      return [...otherImages, ...reorderedPageImages];
    });
  };

  const getActiveImagesForPage = (pageId: string) => {
    return images
      .filter(img => img.pageId === pageId && img.active)
      .sort((a, b) => a.order - b.order);
  };

  return (
    <ParallaxContext.Provider
      value={{
        images,
        addImages,
        removeImage,
        toggleImageActive,
        reorderImages,
        getActiveImagesForPage,
        loading
      }}
    >
      {children}
    </ParallaxContext.Provider>
  );
}

export function useParallax() {
  const context = useContext(ParallaxContext);
  if (context === undefined) {
    throw new Error('useParallax must be used within a ParallaxProvider');
  }
  return context;
}