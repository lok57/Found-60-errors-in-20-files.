import { useEffect } from 'react';

interface PayPalButtonProps {
  onSuccess: (details: any) => void;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

export default function PayPalButton({ onSuccess }: PayPalButtonProps) {
  useEffect(() => {
    if (window.paypal) {
      window.paypal
        .Buttons({
          createOrder: (_data: any, actions: any) => {
            // Marked '_data' as unused
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: 'USD',
                    value: '100.00', // Replace with actual amount
                  },
                },
              ],
            });
          },
          onApprove: async (_data: any, actions: any) => {
            // Marked '_data' as unused
            const details = await actions.order.capture();
            onSuccess(details);
          },
        })
        .render('#paypal-button-container');
    }
  }, [onSuccess]);

  return (
    <div>
      <div id="paypal-button-container"></div>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
        You will be redirected to PayPal to complete your payment securely.
      </p>
    </div>
  );
}
