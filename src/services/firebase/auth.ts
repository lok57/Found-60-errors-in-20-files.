import { 
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode,
  type User
} from 'firebase/auth';
import { auth } from '../../config/firebase';
import toast from 'react-hot-toast';

export interface AuthError {
  code: string;
  message: string;
}

export const sendResetPasswordEmail = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: `${window.location.origin}/login`,
      handleCodeInApp: true,
    });
    toast.success('Password reset email sent. Please check your inbox.');
  } catch (error) {
    const authError = error as AuthError;
    const errorMessage = getResetPasswordErrorMessage(authError.code);
    toast.error(errorMessage);
    throw error;
  }
};

export const verifyResetCode = async (code: string): Promise<string> => {
  try {
    return await verifyPasswordResetCode(auth, code);
  } catch (error) {
    toast.error('Invalid or expired reset link');
    throw error;
  }
};

export const resetPassword = async (code: string, newPassword: string): Promise<void> => {
  try {
    await confirmPasswordReset(auth, code, newPassword);
    toast.success('Password reset successful. Please login with your new password.');
  } catch (error) {
    const authError = error as AuthError;
    const errorMessage = getResetPasswordErrorMessage(authError.code);
    toast.error(errorMessage);
    throw error;
  }
};

const getResetPasswordErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later';
    case 'auth/expired-action-code':
      return 'Reset link has expired. Please request a new one';
    case 'auth/invalid-action-code':
      return 'Invalid reset link. Please request a new one';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    default:
      return 'An error occurred. Please try again';
  }
};