import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number | string, currency: string = 'INR'): string => {
  // Convert string price to number if needed
  const numericPrice = typeof price === 'string' 
    ? parseFloat(price.replace(/[^0-9.-]+/g, ''))
    : price;

  // Return formatted price or ₹0.00 if invalid
  if (!Number.isFinite(numericPrice)) return '₹0.00';

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return formatter.format(numericPrice);
}

export const validateIndianMobile = (phone: string): boolean => {
  // Remove all non-numeric characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it's a valid Indian mobile number
  // Should be 10 digits, optionally preceded by country code
  const regex = /^(?:(?:\+|91)?[6-9]\d{9})$/;
  return regex.test(cleanPhone);
};

export const formatIndianMobile = (phone: string): string => {
  // Remove all non-numeric characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // If it's a 10-digit number, add +91
  if (cleanPhone.length === 10) {
    return `+91${cleanPhone}`;
  }
  
  // If it already has the country code
  if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) {
    return `+${cleanPhone}`;
  }
  
  return phone;
};