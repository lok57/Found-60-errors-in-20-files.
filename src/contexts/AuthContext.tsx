import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User,
  updateProfile as firebaseUpdateProfile
} from 'firebase/auth';
import toast from 'react-hot-toast';

interface UserProfile {
  name?: string;
  phone?: string;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  error: string | null;
  clearError: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setUserProfile({
          name: user.displayName || undefined,
          email: user.email || '',
          phone: undefined
        });
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const clearError = () => {
    setError(null);
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      toast.success('Successfully logged in!');
    } catch (err) {
      const errorMessage = 'Failed to login. Please check your credentials';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      toast.success('Account created successfully!');
    } catch (err) {
      const errorMessage = 'Failed to create account';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
    } catch (err) {
      const errorMessage = 'Failed to send password reset email';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      if (!currentUser) throw new Error('No user logged in');

      if (data.name) {
        await firebaseUpdateProfile(currentUser, {
          displayName: data.name
        });
      }

      setUserProfile(prev => prev ? { ...prev, ...data } : null);
      toast.success('Profile updated successfully');
    } catch (err) {
      const errorMessage = 'Failed to update profile';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserProfile(null);
      toast.success('Successfully logged out!');
    } catch (err) {
      const errorMessage = 'Failed to logout';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  const value = {
    currentUser,
    userProfile,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
    error,
    clearError,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}