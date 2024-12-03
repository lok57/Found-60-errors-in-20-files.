import { useState } from 'react';
import { CreditCard, Phone } from 'lucide-react';
import PayPalButton from './payment/PayPalButton';
import CreditCardForm from './payment/CreditCardForm';
import UPIForm from './payment/UPIForm';

interface PaymentSectionProps {
  selectedMethod: string | null;
  onMethodSelect: (method: string) => void;
  onComplete: () => void;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ElementType | string; // Type for the icon (could be a component or image URL)
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: CreditCard,
    description: 'Pay securely with your card',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '/paypal-logo.svg',
    description: 'Fast and secure payment with PayPal',
  },
  {
    id: 'upi',
    name: 'UPI Payment',
    icon: Phone,
    description: 'Pay using Google Pay, PhonePe, or other UPI apps',
  },
];

export default function PaymentSection({
  selectedMethod,
  onMethodSelect,
  onComplete,
}: PaymentSectionProps) {
  // @ts-ignore
  const [paymentData, setPaymentData] = useState<any>(null);

  const handlePaymentSubmit = (data: any) => {
    setPaymentData(data);
    // Here you would integrate with your payment gateway
    onComplete();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Payment Method
      </h2>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id}>
            <label
              htmlFor={method.id} // Added htmlFor for accessibility
              className="flex items-start space-x-4 p-4 border dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <input
                id={method.id} // Added id for each radio button
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={() => onMethodSelect(method.id)}
                className="mt-1 text-accent-600 focus:ring-accent-500"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  {typeof method.icon === 'string' ? (
                    <img
                      src={method.icon}
                      alt={method.name}
                      className="w-6 h-6"
                    />
                  ) : (
                    <method.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  )}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {method.name}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {method.description}
                </p>
              </div>
            </label>

            {selectedMethod === method.id && (
              <div className="mt-4 ml-8">
                {method.id === 'card' && (
                  <CreditCardForm onSubmit={handlePaymentSubmit} />
                )}
                {method.id === 'paypal' && (
                  <PayPalButton onSuccess={handlePaymentSubmit} />
                )}
                {method.id === 'upi' && (
                  <UPIForm onSubmit={handlePaymentSubmit} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
