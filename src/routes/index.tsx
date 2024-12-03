import { Routes, Route } from 'react-router-dom';
import AuthGuard from '../components/auth/AuthGuard';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import Home from '../pages/Home';
import ElectronicsPage from '../pages/ElectronicsPage';
import MensPage from '../pages/MensPage';
import WomensPage from '../pages/WomensPage';
import WatchesPage from '../pages/WatchesPage';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import CheckoutSuccess from '../pages/CheckoutSuccess';
import Profile from '../pages/Profile';
import AdminDashboard from '../components/AdminDashboard';
import AdminLogin from '../components/AdminLogin';
import AdminCredentials from '../components/AdminCredentials';
import ProtectedRoute from './ProtectedRoute';
import AboutUs from '../pages/AboutUs';
import FAQs from '../pages/FAQs';
import PrivacyPolicy from '../pages/PrivacyPolicy';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/electronics" element={<ElectronicsPage />} />
      <Route path="/men" element={<MensPage />} />
      <Route path="/women" element={<WomensPage />} />
      <Route path="/watches" element={<WatchesPage />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      
      {/* Auth Routes */}
      <Route
        path="/forgot-password"
        element={
          <AuthGuard requireAuth={false}>
            <ForgotPasswordForm />
          </AuthGuard>
        }
      />
      <Route
        path="/reset-password"
        element={
          <AuthGuard requireAuth={false}>
            <ResetPasswordForm />
          </AuthGuard>
        }
      />
      <Route
        path="/cart"
        element={
          <AuthGuard>
            <Cart />
          </AuthGuard>
        }
      />
      <Route
        path="/checkout"
        element={
          <AuthGuard>
            <Checkout />
          </AuthGuard>
        }
      />
      <Route
        path="/checkout/success"
        element={
          <AuthGuard>
            <CheckoutSuccess />
          </AuthGuard>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthGuard>
            <Profile />
          </AuthGuard>
        }
      />
      <Route
        path="/login"
        element={
          <AuthGuard requireAuth={false}>
            <LoginForm />
          </AuthGuard>
        }
      />
      <Route
        path="/register"
        element={
          <AuthGuard requireAuth={false}>
            <RegisterForm />
          </AuthGuard>
        }
      />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/credentials"
        element={
          <ProtectedRoute>
            <AdminCredentials />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}