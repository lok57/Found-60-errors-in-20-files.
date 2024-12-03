import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useLocale } from '../contexts/LocaleContext';
import { useAuth } from '../contexts/AuthContext';
import { createOrder } from '../services/firebase/orders';
import AddressSection from '../components/checkout/AddressSection';
import PaymentSection from '../components/checkout/PaymentSection';
import OrderSummary from '../components/checkout/OrderSummary';
import CheckoutProgress from '../components/checkout/CheckoutProgress';
import { ArrowLeft, ShoppingBag, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

type CheckoutStep = 'address' | 'payment' | 'review' | 'confirm';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { formatPrice } = useLocale();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleStepComplete = async (step: CheckoutStep) => {
    try {
      switch (step) {
        case 'address':
          if (!selectedAddress) {
            toast.error('Please select an address');
            return;
          }
          setCurrentStep('payment');
          break;

        case 'payment':
          if (!selectedPaymentMethod) {
            toast.error('Please select a payment method');
            return;
          }
          setCurrentStep('review');
          break;

        case 'review':
          setIsProcessing(true);
          const shipping = 0;
          const tax = total * 0.18;
          const grandTotal = total + shipping + tax;

          try {
            // Create order in Firebase
            await createOrder(currentUser.uid, {
              items,
              total,
              shipping,
              tax,
              grandTotal,
              status: 'pending',
              paymentMethod: selectedPaymentMethod,
              shippingAddress: selectedAddress,
              createdAt: new Date().toISOString()
            });

            clearCart();
            navigate('/checkout/success');
          } catch (error) {
            console.error('Failed to create order:', error);
            toast.error('Failed to place order. Please try again.');
          }
          break;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <CheckoutProgress currentStep={currentStep} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {currentStep === 'address' && (
              <AddressSection
                selectedAddress={selectedAddress}
                onAddressSelect={setSelectedAddress}
                onComplete={() => handleStepComplete('address')}
              />
            )}

            {currentStep === 'payment' && (
              <PaymentSection
                selectedMethod={selectedPaymentMethod}
                onMethodSelect={setSelectedPaymentMethod}
                onComplete={() => handleStepComplete('payment')}
              />
            )}

            {currentStep === 'review' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Review Order
                </h2>

                <div className="space-y-6">
                  {/* Shipping Address */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Shipping Address
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedAddress.name}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedAddress.addressLine1}
                        {selectedAddress.addressLine2 && (
                          <>, {selectedAddress.addressLine2}</>
                        )}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedAddress.city}, {selectedAddress.state}{' '}
                        {selectedAddress.postalCode}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedAddress.country}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Phone: {selectedAddress.phone}
                      </p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Payment Method
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-gray-900 dark:text-white">
                        {selectedPaymentMethod === 'card'
                          ? 'Credit/Debit Card'
                          : selectedPaymentMethod === 'paypal'
                          ? 'PayPal'
                          : 'UPI Payment'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStepComplete('review')}
                    disabled={isProcessing}
                    className="w-full bg-accent-600 text-white py-3 rounded-lg hover:bg-accent-700 transition-colors disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <OrderSummary
              items={items}
              total={total}
              formatPrice={formatPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}