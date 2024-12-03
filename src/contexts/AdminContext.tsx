import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const DEFAULT_ADMIN = {
  email: 'admin@luxe.com',
  password: 'admin123'
};

interface AdminContextType {
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateAdminCredentials: (email: string, currentPassword: string, newPassword?: string) => Promise<boolean>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState(DEFAULT_ADMIN);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAdmin(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const isValid = email === adminCredentials.email && password === adminCredentials.password;
      
      if (isValid) {
        setIsAdmin(true);
        localStorage.setItem('adminToken', btoa(`${email}:${Date.now()}`));
        toast.success('Successfully logged in as admin');
        return true;
      }
      toast.error('Invalid credentials');
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed');
      return false;
    }
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('adminToken');
    toast.success('Logged out successfully');
  };

  const updateAdminCredentials = async (email: string, currentPassword: string, newPassword?: string) => {
    try {
      if (currentPassword !== adminCredentials.password) {
        toast.error('Current password is incorrect');
        return false;
      }

      setAdminCredentials({
        email: email || adminCredentials.email,
        password: newPassword || adminCredentials.password
      });

      toast.success('Admin credentials updated successfully');
      return true;
    } catch (error) {
      console.error('Failed to update admin credentials:', error);
      toast.error('Failed to update credentials');
      return false;
    }
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, updateAdminCredentials }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}