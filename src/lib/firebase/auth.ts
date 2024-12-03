import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import { auth } from '../../config/firebase';
import toast from 'react-hot-toast';

export interface AuthError {
  code: string;
  message: string;
}

const getErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please try logging in instead.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/operation-not-allowed':
      return 'Email/password sign up is not enabled. Please contact support.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Invalid email or password.';
    default:
      return 'An error occurred. Please try again.';
  }
};

export const signUpUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    toast.success('Account created successfully!');
    return userCredential.user;
  } catch (error) {
    const errorMessage = getErrorMessage(error as AuthError);
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    toast.success('Logged in successfully!');
    return userCredential.user;
  } catch (error) {
    const errorMessage = getErrorMessage(error as AuthError);
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    toast.success('Logged out successfully!');
  } catch (error) {
    toast.error('Failed to log out. Please try again.');
    throw error;
  }
};

export const initAuthStateListener = (callback: (user: User | null) => void): (() => void) => {
  return onAuthStateChanged(auth, callback);
};