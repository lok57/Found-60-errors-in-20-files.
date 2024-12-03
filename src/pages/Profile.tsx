import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User } from 'lucide-react';

export default function Profile() {
  const { currentUser, userProfile, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-center mb-8">
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-accent-100 flex items-center justify-center">
                <User className="w-12 h-12 text-accent-600" />
              </div>
            )}
          </div>

          <div className="space-y-6">
            {userProfile?.name && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{userProfile.name}</p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{currentUser.email}</p>
            </div>

            {userProfile?.createdAt && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {new Date(userProfile.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}

            <div className="pt-6">
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="w-full bg-accent-600 text-white py-3 px-4 rounded-lg hover:bg-accent-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Logging out...' : 'Log Out'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}