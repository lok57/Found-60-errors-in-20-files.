import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { User } from 'lucide-react';
import { validateIndianMobile, formatIndianMobile } from '../../../lib/utils';
import toast from 'react-hot-toast';

export default function AccountOverview() {
  const { currentUser, userProfile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || currentUser?.displayName || '',
    phone: userProfile?.phone || '',
    email: currentUser?.email || '',
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || currentUser?.displayName || '',
        phone: userProfile.phone || '',
        email: currentUser?.email || '',
      });
    }
  }, [userProfile, currentUser]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Remove all non-numeric characters except "+"
    value = value.replace(/[^\d+]/g, '');

    // Ensure it starts with +91 for Indian phone numbers
    if (!value.startsWith('+91') && value.length > 0) {
      value = '+91' + value;
    }

    // Limit to +91 followed by exactly 10 digits
    if (value.startsWith('+91')) {
      const digits = value.slice(3);
      if (digits.length > 10) {
        value = '+91' + digits.slice(0, 10);
      }
    }

    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate phone number
      if (formData.phone && !validateIndianMobile(formData.phone)) {
        toast.error('Please enter a valid Indian mobile number');
        return;
      }

      const formattedPhone = formData.phone
        ? formatIndianMobile(formData.phone)
        : '';

      await updateProfile({
        name: formData.name.trim(),
        phone: formattedPhone,
        email: formData.email.trim(),
      });

      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to initial values
    setFormData({
      name: userProfile?.name || currentUser?.displayName || '',
      phone: userProfile?.phone || '',
      email: currentUser?.email || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">Account Overview</h2>

      <div className="bg-white/10 rounded-xl p-6">
        <div className="flex items-center space-x-4 mb-6">
          {currentUser?.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-accent-600 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold">
              {userProfile?.name || currentUser?.displayName || 'User'}
            </h3>
            <p className="text-white/70">{currentUser?.email}</p>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                placeholder="+91"
              />
              <p className="text-sm text-white/50 mt-1">
                Format: +91 followed by 10 digits
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="px-6 py-2 border border-white/20 rounded-lg hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-white/70">Phone Number</p>
              <p className="font-medium">{userProfile?.phone || 'Not set'}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 border border-white/20 rounded-lg hover:bg-white/10"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}