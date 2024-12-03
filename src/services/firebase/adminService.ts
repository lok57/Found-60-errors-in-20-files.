import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export async function checkAdminStatus(uid: string): Promise<boolean> {
  try {
    const adminDocRef = doc(db, 'admins', uid);
    const adminDoc = await getDoc(adminDocRef);
    return adminDoc.exists();
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}