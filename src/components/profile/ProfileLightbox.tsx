import { useState, useEffect } from 'react';
import { X, User, ShoppingBag, Lock, MapPin, CreditCard, Bell, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AccountOverview from './sections/AccountOverview';
import OrderHistory from './sections/OrderHistory';
import SecuritySettings from './sections/SecuritySettings';
import AddressBook from './sections/AddressBook';
import PaymentMethods from './sections/PaymentMethods';
import NotificationSettings from './sections/NotificationSettings';
import PrivacySettings from './sections/PrivacySettings';

interface ProfileLightboxProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'overview', label: 'Account Overview', icon: User },
  { id: 'orders', label: 'Your Orders', icon: ShoppingBag },
  { id: 'security', label: 'Login & Security', icon: Lock },
  { id: 'addresses', label: 'Your Addresses', icon: MapPin },
  { id: 'payments', label: 'Payment Methods', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy Settings', icon: Shield }
];

export default function ProfileLightbox({ isOpen, onClose }: ProfileLightboxProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [scrollOffset, setScrollOffset] = useState({ x: 0, y: 0 });
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset({
        x: window.scrollX * 0.1,
        y: window.scrollY * 0.1
      });
    };

    if (isOpen) {
      window.addEventListener('scroll', handleScroll);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !currentUser) return null;

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <AccountOverview />;
      case 'orders':
        return <OrderHistory />;
      case 'security':
        return <SecuritySettings />;
      case 'addresses':
        return <AddressBook />;
      case 'payments':
        return <PaymentMethods />;
      case 'notifications':
        return <NotificationSettings />;
      case 'privacy':
        return <PrivacySettings />;
      default:
        return <AccountOverview />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80")',
          transform: `translate(${scrollOffset.x}px, ${scrollOffset.y}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          <div className="flex h-[80vh]">
            {/* Sidebar */}
            <div className="w-64 bg-black/20 p-6 space-y-6">
              <div className="flex items-center space-x-3 mb-8">
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-accent-600 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                )}
                <div className="text-white">
                  <p className="font-medium">{currentUser.displayName || 'User'}</p>
                  <p className="text-sm text-white/70">{currentUser.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-white/20 text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors mt-auto"
              >
                <LogOut className="w-5 h-5" />
                <span>Log Out</span>
              </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="max-w-3xl mx-auto">
                {renderSection()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}