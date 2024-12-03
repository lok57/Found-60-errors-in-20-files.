import { useState } from 'react';
import { CreditCard } from 'lucide-react';

interface CreditCardFormProps {
  onSubmit: (data: any) => void;
}

export default function CreditCardForm({ onSubmit }: CreditCardFormProps) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = 'Cardholder name is required';
    }

    if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }

    if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Card Number
        </label>
        <div className="mt-1 relative">
          <input
            type="text"
            value={formData.cardNumber}
            onChange={(e) => setFormData({
              ...formData,
              cardNumber: formatCardNumber(e.target.value)
            })}
            maxLength={19}
            placeholder="1234 5678 9012 3456"
            className={`block w-full pl-10 pr-3 py-2 rounded-md shadow-sm ${
              errors.cardNumber
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-accent-500 focus:border-accent-500'
            } dark:bg-gray-700 dark:text-white`}
          />
          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        {errors.cardNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Cardholder Name
        </label>
        <input
          type="text"
          value={formData.cardHolder}
          onChange={(e) => setFormData({
            ...formData,
            cardHolder: e.target.value
          })}
          placeholder="John Doe"
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.cardHolder
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-accent-500 focus:border-accent-500'
          } dark:bg-gray-700 dark:text-white`}
        />
        {errors.cardHolder && (
          <p className="mt-1 text-sm text-red-600">{errors.cardHolder}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Expiry Date
          </label>
          <input
            type="text"
            value={formData.expiryDate}
            onChange={(e) => setFormData({
              ...formData,
              expiryDate: formatExpiryDate(e.target.value)
            })}
            placeholder="MM/YY"
            maxLength={5}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.expiryDate
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-accent-500 focus:border-accent-500'
            } dark:bg-gray-700 dark:text-white`}
          />
          {errors.expiryDate && (
            <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            CVV
          </label>
          <input
            type="password"
            value={formData.cvv}
            onChange={(e) => setFormData({
              ...formData,
              cvv: e.target.value.replace(/\D/g, '')
            })}
            placeholder="123"
            maxLength={4}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.cvv
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-accent-500 focus:border-accent-500'
            } dark:bg-gray-700 dark:text-white`}
          />
          {errors.cvv && (
            <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-accent-600 text-white py-2 rounded-md hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
      >
        Pay Now
      </button>
    </form>
  );
}