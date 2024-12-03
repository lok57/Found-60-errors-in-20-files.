export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  media: ProductMedia[];
  category: string;
  inStock?: boolean;
  createdAt: string;
  updatedAt: string;
  sizes?: string[];
  image?: string;
}
export interface ProductManager {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
  sizes: string[];
  media: string[]; // Add the media field here (as an array of strings)
  createdAt: string;
  updatedAt: string;
}

export interface ProductMedia {
  url: string;
  type: 'image' | 'video';
}

export interface ProductMedia {
  url: string;
  type: 'image' | 'video';
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
  image?: string;
}

export type MediaFile = {
  id: string;
  type: 'image' | 'video';
  file: File;
  preview: string;
};
