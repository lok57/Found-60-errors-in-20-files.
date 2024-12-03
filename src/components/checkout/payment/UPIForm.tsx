import { useState } from 'react';
import QRCode from 'qrcode.react';

interface UPIFormProps {
  onSubmit: (data: any) => void;
}

export default function UPIForm({ onSubmit }: UPIFormProps) {
  const [upiId, setUpiId] = useState('');
  const [error, setError] = useState('');
  const [showQR, setShowQR] = useState(false);

  // Demo UPI payment data
  const paymentData = {
    payeeVPA: 'merchant@upi',
    payeeName: 'LUXE Store',
    transactionNote: 'Purchase at LUXE Store',
    amount: '1000.00'
  };

  const validateUpiId = (id: string) => {
    const upiRegex = /^[\w\.\-_]{3,}@[a-zA-Z]{3,}$/;
    return upiRegex.test(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateUpiId(upiId)) {
      setError('Please enter a valid UPI ID');
      return;
    }

    onSubmit({ upiId });
  };

  const generateQRValue = () => {
    return `upi://pay?pa=${paymentData.payeeVPA}&pn=${encodeURIComponent(
      paymentData.payeeName
    )}&tn=${encodeURIComponent(
      paymentData.transactionNote
    )}&am=${paymentData.amount}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setShowQR(false)}
          className={`flex-1 py-2 px-4 rounded-md ${
            !showQR
              ? 'bg-accent-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Enter UPI ID
        </button>
        <button
          type="button"
          onClick={() => setShowQR(true)}
          className={`flex-1 py-2 px-4 rounded-md ${
            showQR
              ? 'bg-accent-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Scan QR Code
        </button>
      </div>

      {showQR ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-white p-4 rounded-lg">
            <QRCode value={generateQRValue()} size={200} />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Scan this QR code using any UPI app to pay
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              UPI ID
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => {
                setUpiId(e.target.value);
                setError('');
              }}
              placeholder="username@upi"
              className={`mt-1 block w-full rounded-md shadow-sm ${
                error
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-accent-500 focus:border-accent-500'
              } dark:bg-gray-700 dark:text-white`}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-accent-600 text-white py-2 rounded-md hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
          >
            Verify & Pay
          </button>
        </form>
      )}

      <div className="flex justify-center space-x-4">
        <img src="/gpay-logo.svg" alt="Google Pay" className="h-8" />
        <img src="/phonepe-logo.svg" alt="PhonePe" className="h-8" />
        <img src="/paytm-logo.svg" alt="Paytm" className="h-8" />
      </div>
    </div>
  );
}