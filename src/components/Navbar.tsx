import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProfileLightbox from './profile/ProfileLightbox';
import ThemeToggle from './ThemeToggle';
import LocaleSelector from './LocaleSelector';
import Chatbot from './Chatbot';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-accent-600 tracking-tight">
              MSPL Store
            </Link>
            
            <div className="hidden md:flex space-x-8">
              <Link to="/electronics" className="text-primary-700 dark:text-gray-200 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                Electronics
              </Link>
              <Link to="/men" className="text-primary-700 dark:text-gray-200 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                Men
              </Link>
              <Link to="/women" className="text-primary-700 dark:text-gray-200 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                Women
              </Link>
              <Link to="/watches" className="text-primary-700 dark:text-gray-200 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                Watches
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Language/Currency Selector */}
              <LocaleSelector />

              <button 
                onClick={() => currentUser ? setIsProfileOpen(true) : navigate('/login')}
                className="text-primary-700 dark:text-gray-200 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
              >
                <User className="h-6 w-6" />
              </button>

              <Link 
                to="/cart" 
                className="text-primary-700 dark:text-gray-200 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
              >
                <ShoppingBag className="h-6 w-6" />
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-primary-700 dark:text-gray-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/electronics" 
                className="text-primary-700 dark:text-gray-200 hover:text-accent-600 dark:hover:text-accent-400 px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Electronics
              </Link>
              <Link 
                to="/men" 
                className="text-primary-700 dark:text-gray-200 hover:text-accent-600 dark:hover:text-accent-400 px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Men
              </Link>
              <Link 
                to="/women" 
                className="text-primary-700 dark:text-gray-200 hover:text-accent-600 dark:hover:text-accent-400 px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Women
              </Link>
              <Link 
                to="/watches" 
                className="text-primary-700 dark:text-gray-200 hover:text-accent-600 dark:hover:text-accent-400 px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Watches
              </Link>
            </div>
          </div>
        )}
      </nav>

      <ProfileLightbox
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Chatbot */}
      <Chatbot />
    </>
  );
}