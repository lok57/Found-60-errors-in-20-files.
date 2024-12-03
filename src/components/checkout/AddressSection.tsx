import { useState } from 'react';
import { Plus, Edit2, Trash2, Check } from 'lucide-react';
import AddressForm from './AddressForm';

interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

interface AddressSectionProps {
  selectedAddress: string | null;
  onAddressSelect: (addressId: string) => void;
  onComplete: () => void;
}

export default function AddressSection({
  selectedAddress,
  onAddressSelect,
  onComplete
}: AddressSectionProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleAddAddress = (address: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...address,
      id: crypto.randomUUID()
    };
    setAddresses([...addresses, newAddress]);
    setShowForm(false);
  };

  const handleEditAddress = (updatedAddress: Address | Omit<Address, 'id'>) => {
    if ('id' in updatedAddress) {
      setAddresses(prev =>
        prev.map(addr => (addr.id === updatedAddress.id ? updatedAddress : addr))
      );
    }
    setEditingAddress(null);
    setShowForm(false);
  };

  const handleDeleteAddress = (id: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
      if (selectedAddress === id) {
        onAddressSelect('');
      }
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Delivery Address
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 text-accent-600 hover:text-accent-700"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Address</span>
        </button>
      </div>

      {showForm || editingAddress ? (
        <AddressForm
          address={editingAddress}
          onSubmit={editingAddress ? handleEditAddress : handleAddAddress}
          onCancel={() => {
            setShowForm(false);
            setEditingAddress(null);
          }}
        />
      ) : (
        <div className="space-y-4">
          {addresses.map(address => (
            <div
              key={address.id}
              className={`border dark:border-gray-700 rounded-lg p-4 ${
                selectedAddress === address.id
                  ? 'border-accent-600 dark:border-accent-500'
                  : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress === address.id}
                      onChange={() => onAddressSelect(address.id)}
                      className="text-accent-600 focus:ring-accent-500"
                    />
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {address.name}
                    </h3>
                    {address.isDefault && (
                      <span className="text-xs bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-400 px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {address.addressLine1}
                    {address.addressLine2 && <>, {address.addressLine2}</>}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {address.country}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Phone: {address.phone}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingAddress(address)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-accent-600"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {addresses.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No addresses saved yet. Add a new address to continue.
            </p>
          )}
        </div>
      )}

      <div className="mt-8">
        <button
          onClick={onComplete}
          disabled={!selectedAddress}
          className="w-full bg-accent-600 text-white py-3 rounded-lg hover:bg-accent-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}