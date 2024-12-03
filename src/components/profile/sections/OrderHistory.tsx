import { useState, useEffect } from 'react';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { getUserOrders } from '../../../services/firebase/orders';
import { useAuth } from '../../../contexts/AuthContext';
import { useLocale } from '../../../contexts/LocaleContext';

export default function OrderHistory() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { formatPrice } = useLocale();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (currentUser) {
          const userOrders = await getUserOrders(currentUser.uid);
          setOrders(userOrders);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center text-white py-12">
        <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
        <p className="text-white/70">Start shopping to see your orders here</p>
      </div>
    );
  }

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
      
      <div className="space-y-4">
        {orders.map((order: any) => (
          <div key={order.id} className="bg-white/10 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-white/70">Order #{order.id}</p>
                <p className="text-sm text-white/70">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                order.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                order.status === 'processing' ? 'bg-blue-500/20 text-blue-300' :
                'bg-yellow-500/20 text-yellow-300'
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-white/70">Quantity: {item.quantity}</p>
                    {item.size && (
                      <p className="text-sm text-white/70">Size: {item.size}</p>
                    )}
                  </div>
                  <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center pt-4 border-t border-white/10">
              <div>
                <p className="font-medium">Total: {formatPrice(order.grandTotal)}</p>
                <p className="text-sm text-white/70">
                  Includes GST of {formatPrice(order.tax)}
                </p>
              </div>
              <button className="flex items-center space-x-2 text-accent-400 hover:text-accent-300">
                <span>View Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}