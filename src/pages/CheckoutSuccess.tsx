import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  useEffect(() => {
    // Clear cart and other checkout data here
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Order Number
            </p>
            <p className="text-xl font-mono font-bold text-gray-900 dark:text-white">
              #{orderNumber}
            </p>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            We'll send you a confirmation email with your order details and tracking
            information.
          </p>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/orders')}
              className="flex items-center space-x-2 px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>View Order</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}