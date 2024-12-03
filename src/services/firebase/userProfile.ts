import { ref, get, set, update } from 'firebase/database';
import { db } from '../../config/firebase';
import { UserProfile } from '../../types/auth';
import toast from 'react-hot-toast';

export async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);
    
    if (!snapshot.exists()) {
      const defaultProfile: Partial<UserProfile> = {
        email: '',
        phone: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await set(userRef, defaultProfile);
      return { id: uid, ...defaultProfile } as UserProfile;
    }
    
    return { id: uid, ...snapshot.val() } as UserProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    toast.error('Unable to load profile');
    return null;
  }
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  try {
    const userRef = ref(db, `users/${uid}`);
    const updateData = {
      ...data,
      updatedAt: new Date().toISOString()
    };

    await update(userRef, updateData);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

export async function createUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  try {
    const userRef = ref(db, `users/${uid}`);
    await set(userRef, {
      ...data,
      phone: data.phone || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}