export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  media?: ProductMedia[];
  category: string;
  subcategory?: string;
  inStock?: boolean;
  sizes?: string[];
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductMedia {
  url: string;
  type: 'image' | 'video';
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'upi';
  details: CardDetails | PayPalDetails | UPIDetails;
  isDefault: boolean;
}

interface CardDetails {
  lastFour: string;
  expiryDate: string;
  cardHolder: string;
}

interface PayPalDetails {
  email: string;
}

interface UPIDetails {
  id: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  shipping: number;
  tax: number;
  grandTotal: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
  createdAt: string;
}