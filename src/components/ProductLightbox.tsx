import { useState } from 'react';
import {
  X,
  Heart,
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
  Share2,
  Bell,
  Facebook,
  Twitter,
  Link as LinkIcon,
} from 'lucide-react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useLocale } from '../contexts/LocaleContext';
import SizeSelector from './SizeSelector';
import Toast from './Toast';

interface ProductLightboxProps {
  product: Product | null;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  showNavigation?: boolean;
  onAddToCart?: () => void;
  onAddToWaitlist?: () => void;
}

export default function ProductLightbox({
  product,
  onClose,
  onPrevious,
  onNext,
  showNavigation = false,
  onAddToCart,
  onAddToWaitlist
}: ProductLightboxProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addItem } = useCart();
  const { formatPrice } = useLocale();

  if (!product) return null;

  const mediaUrls = product.media?.length
    ? product.media.map((m) => m.url)
    : product.image
    ? [product.image]
    : ['https://via.placeholder.com/400'];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setToastMessage('Please select a size');
      setShowToast(true);
      return;
    }

    if (!currentUser) {
      navigate('/login');
      onClose();
      return;
    }

    addItem({ ...product, quantity: 1, size: selectedSize });
    setToastMessage('Added to cart successfully!');
    setShowToast(true);
    setTimeout(() => onClose(), 1500);
    if (onAddToCart) {
      onAddToCart();
    }
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setToastMessage('Please select a size');
      setShowToast(true);
      return;
    }

    if (!currentUser) {
      navigate('/login');
      onClose();
      return;
    }

    addItem({ ...product, quantity: 1, size: selectedSize });
    onClose();
    navigate('/checkout');
  };

  const handleShare = async (platform: 'facebook' | 'twitter' | 'copy') => {
    const url = window.location.href;
    const text = `Check out ${product.name} - ${product.description}`;

    switch (platform) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          '_blank'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setToastMessage('Link copied to clipboard!');
          setShowToast(true);
        } catch (err) {
          setToastMessage('Failed to copy link');
          setShowToast(true);
        }
        break;
    }
    setShowShareMenu(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((current) => (current + 1) % mediaUrls.length);
  };

  const previousImage = () => {
    setCurrentImageIndex(
      (current) => (current - 1 + mediaUrls.length) % mediaUrls.length
    );
  };

  const handleWaitlistSubmit = () => {
    if (onAddToWaitlist) {
      onAddToWaitlist();
    }
    setShowWaitlistForm(false);
    setToastMessage('Added to waitlist successfully!');
    setShowToast(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-4xl rounded-2xl bg-white dark:bg-gray-800 shadow-2xl">
          <div className="absolute right-4 top-4 z-10 flex space-x-2">
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="rounded-full bg-white/90 dark:bg-gray-700/90 p-2 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>

              {showShareMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Facebook className="mr-3 h-4 w-4" />
                      Share on Facebook
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Twitter className="mr-3 h-4 w-4" />
                      Share on Twitter
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LinkIcon className="mr-3 h-4 w-4" />
                      Copy Link
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-white/90 dark:bg-gray-700/90 p-2 hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {showNavigation && (
            <>
              <button
                onClick={onPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 dark:bg-gray-700/90 p-3 hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 dark:bg-gray-700/90 p-3 hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2">
              <div className="relative aspect-square">
                <img
                  src={mediaUrls[currentImageIndex]}
                  alt={product.name}
                  className="h-full w-full object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
                />
                {mediaUrls.length > 1 && (
                  <>
                    <button
                      onClick={previousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 p-2 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 p-2 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              {mediaUrls.length > 1 && (
                <div className="p-4 grid grid-cols-4 gap-2">
                  {mediaUrls.map((url, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex
                          ? 'border-accent-600'
                          : 'border-transparent hover:border-accent-300'
                      }`}
                    >
                      <img
                        src={url}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-8 lg:w-1/2">
              <div className="mb-8">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                  {product.category}
                </p>
                <div className="flex flex-col mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {product.name}
                  </h2>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {product.description}
                </p>

                <SizeSelector
                  sizes={product.sizes || ['XS', 'S', 'M', 'L', 'XL']}
                  selectedSize={selectedSize}
                  onSelect={setSelectedSize}
                />
              </div>

              {!showWaitlistForm ? (
                <div className="space-y-4">
                  {product.inStock !== false ? (
                    <>
                      <button
                        onClick={handleBuyNow}
                        className="w-full flex items-center justify-center space-x-2 bg-accent-600 text-white px-6 py-3 rounded-full hover:bg-accent-700 transition-colors"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        <span>Buy Now</span>
                      </button>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={handleAddToCart}
                          className="flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <ShoppingBag className="w-5 h-5" />
                          <span>Add to Cart</span>
                        </button>
                        <button
                          onClick={() => setShowWaitlistForm(true)}
                          className="flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Bell className="w-5 h-5" />
                          <span>Notify Me</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => setShowWaitlistForm(true)}
                      className="w-full flex items-center justify-center space-x-2 bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      <Bell className="w-5 h-5" />
                      <span>Join Waitlist</span>
                    </button>
                  )}
                  <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>Add to Wishlist</span>
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleWaitlistSubmit();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your email"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-accent-600 text-white px-6 py-3 rounded-full hover:bg-accent-700 transition-colors"
                  >
                    Join Waitlist
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowWaitlistForm(false)}
                    className="w-full border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Toast
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}