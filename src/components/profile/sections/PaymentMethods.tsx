import { useState } from 'react';
import { CreditCard, Plus, Trash2 } from 'lucide-react';

interface PaymentMethod {
  id: string;
  cardNumber: string;
  expiryDate: string;
  cardHolder: string;
  isDefault: boolean;
}

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cardHolder: '',
    isDefault: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPaymentMethod = {
      ...formData,
      id: Date.now().toString(),
      cardNumber: formData.cardNumber.replace(/\s/g, '').slice(-4)
    };
    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    setShowForm(false);
    setFormData({
      cardNumber: '',
      expiryDate: '',
      cardHolder: '',
      isDefault: false
    });
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

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

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Payment Methods</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-accent-600 rounded-lg hover:bg-accent-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Payment Method</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white/10 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Payment Method</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Card Number</label>
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  cardNumber: formatCardNumber(e.target.value)
                })}
                maxLength={19}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Expiry Date</label>
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 4) {
                      const month = value.slice(0, 2);
                      const year = value.slice(2);
                      setFormData({
                        ...formData,
                        expiryDate: value.length > 2 ? `${month}/${year}` : month
                      });
                    }
                  }}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Card Holder</label>
                <input
                  type="text"
                  value={formData.cardHolder}
                  onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isDefault"
                checked={formData.isDefault}
                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                className="rounded border-white/20 bg-white/10 text-accent-600 focus:ring-accent-500"
              />
              <label htmlFor="isDefault" className="text-sm">Set as default payment method</label>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-accent-600 rounded-lg hover:bg-accent-700"
              >
                Add Card
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 border border-white/20 rounded-lg hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {paymentMethods.length === 0 ? (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No Payment Methods</h3>
            <p className="text-white/70">Add your first payment method to get started</p>
          </div>
        ) : (
          paymentMethods.map(method => (
            <div key={method.id} className="bg-white/10 rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <h3 className="font-semibold">•••• {method.cardNumber}</h3>
                  </div>
                  <p className="text-white/70 mt-1">Expires {method.expiryDate}</p>
                  <p className="text-white/70">{method.cardHolder}</p>
                  {method.isDefault && (
                    <span className="inline-block mt-2 px-2 py-1 bg-accent-600/20 text-accent-400 text-sm rounded">
                      Default Payment Method
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(method.id)}
                  className="p-2 hover:bg-white/10 rounded-lg text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}