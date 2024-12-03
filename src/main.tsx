import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ParallaxProvider } from './contexts/ParallaxContext';
import { ProductProvider } from './contexts/ProductContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { AdminProvider } from './contexts/AdminContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './contexts/LocaleContext';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <AdminProvider>
            <CartProvider>
              <ProductProvider>
                <ParallaxProvider>
                  <App />
                  <Toaster 
                    position="bottom-right"
                    toastOptions={{
                      className: 'dark:bg-gray-800 dark:text-white',
                      duration: 3000,
                    }}
                  />
                </ParallaxProvider>
              </ProductProvider>
            </CartProvider>
          </AdminProvider>
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  </React.StrictMode>
);