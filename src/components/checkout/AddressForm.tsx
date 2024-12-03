import { useState } from 'react';
import { validateIndianMobile } from '../../lib/utils';

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

interface AddressFormProps {
  address?: Address | null;
  onSubmit: (address: Address | Omit<Address, 'id'>) => void;
  onCancel: () => void;
}

export default function AddressForm({
  address,
  onSubmit,
  onCancel,
}: AddressFormProps) {
  const [formData, setFormData] = useState({
    name: address?.name || '',
    phone: address?.phone || '',
    addressLine1: address?.addressLine1 || '',
    addressLine2: address?.addressLine2 || '',
    city: address?.city || '',
    state: address?.state || '',
    country: address?.country || 'India',
    postalCode: address?.postalCode || '',
    isDefault: address?.isDefault || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission state

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!validateIndianMobile(formData.phone)) {
      newErrors.phone = 'Please enter a valid Indian mobile number';
    }

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    } else if (!/^\d{6}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Please enter a valid 6-digit postal code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFormSubmitted(true); // Mark the form as submitted

    if (validate()) {
      // On form submission, check if address exists (i.e., it's an update)
      const addressData = address
        ? { ...formData, id: address.id } // include id for update
        : formData; // no id for new address

      // Submit the address data (with or without id)
      onSubmit(addressData);
      // Reset form after successful submit
      setFormData({
        name: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: 'India',
        postalCode: '',
        isDefault: false,
      });
    } else {
      // Show feedback that there are errors
      alert('Please fix the errors and submit again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Show feedback message if form was submitted */}
      {formSubmitted && Object.keys(errors).length === 0 && (
        <p className="text-green-600">Address submitted successfully!</p>
      )}
      {formSubmitted && Object.keys(errors).length > 0 && (
        <p className="text-red-600">
          Please fix the errors above and try again.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.name
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-accent-500 focus:ring-accent-500'
            } dark:bg-gray-700 dark:text-white`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.phone
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-accent-500 focus:ring-accent-500'
            } dark:bg-gray-700 dark:text-white`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Address Line 1
          </label>
          <input
            type="text"
            value={formData.addressLine1}
            onChange={(e) =>
              setFormData({ ...formData, addressLine1: e.target.value })
            }
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.addressLine1
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-accent-500 focus:ring-accent-500'
            } dark:bg-gray-700 dark:text-white`}
          />
          {errors.addressLine1 && (
            <p className="mt-1 text-sm text-red-600">{errors.addressLine1}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Address Line 2 (Optional)
          </label>
          <input
            type="text"
            value={formData.addressLine2}
            onChange={(e) =>
              setFormData({ ...formData, addressLine2: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-accent-500 focus:ring-accent-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            City
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.city
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-accent-500 focus:ring-accent-500'
            } dark:bg-gray-700 dark:text-white`}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            State
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.state
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-accent-500 focus:ring-accent-500'
            } dark:bg-gray-700 dark:text-white`}
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Postal Code
          </label>
          <input
            type="text"
            value={formData.postalCode}
            onChange={(e) =>
              setFormData({ ...formData, postalCode: e.target.value })
            }
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.postalCode
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-accent-500 focus:ring-accent-500'
            } dark:bg-gray-700 dark:text-white`}
          />
          {errors.postalCode && (
            <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
          )}
        </div>

        <div className="md:col-span-2 flex items-center">
          <input
            type="checkbox"
            checked={formData.isDefault}
            onChange={() =>
              setFormData({ ...formData, isDefault: !formData.isDefault })
            }
            id="isDefault"
            className="h-4 w-4 text-accent-500 border-gray-300 dark:border-gray-600 focus:ring-accent-500 dark:bg-gray-700"
          />
          <label
            htmlFor="isDefault"
            className="ml-2 text-sm text-gray-700 dark:text-gray-300"
          >
            Set as default address
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-gray-700 dark:text-gray-300 hover:text-accent-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 text-sm text-white bg-accent-500 rounded-md shadow-sm hover:bg-accent-600"
        >
          Save Address
        </button>
      </div>
    </form>
  );
}
