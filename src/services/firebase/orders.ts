import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { CartItem } from '../../contexts/CartContext';

interface OrderDetails {
  items: CartItem[];
  total: number;
  shipping: number;
  tax: number;
  grandTotal: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentMethod: string;
  shippingAddress: {
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  createdAt: string;
}

export async function createOrder(userId: string, orderDetails: OrderDetails) {
  try {
    if (!db) {
      throw new Error('Firestore is not initialized');
    }

    const ordersRef = collection(db, 'users', userId, 'orders');
    const docRef = await addDoc(ordersRef, {
      ...orderDetails,
      createdAt: new Date().toISOString()
    });

    if (!docRef.id) {
      throw new Error('Failed to create order');
    }

    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function getUserOrders(userId: string) {
  try {
    if (!db) {
      throw new Error('Firestore is not initialized');
    }

    const ordersRef = collection(db, 'users', userId, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}