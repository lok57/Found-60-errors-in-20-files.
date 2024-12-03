import { CartItem } from '../../types';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  formatPrice: (price: number) => string;
}

export default function OrderSummary({
  items,
  total,
  formatPrice,
}: OrderSummaryProps) {
  const shipping = 0; // Free shipping
  const tax = total * 0.18; // 18% GST
  const grandTotal = total + shipping + tax;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.size || 'no-size'}`}
            className="flex justify-between"
          >
            <div className="flex-1">
              <p className="text-gray-700 dark:text-gray-300">
                {item.name} x {item.quantity}
              </p>
              {item.size && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Size: {item.size}
                </p>
              )}
            </div>
            <p className="text-gray-900 dark:text-white font-medium">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t dark:border-gray-700 pt-4">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Tax (18% GST)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t dark:border-gray-700">
          <span>Total</span>
          <span>{formatPrice(grandTotal)}</span>
        </div>
      </div>
    </div>
  );
}
