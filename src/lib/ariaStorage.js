// Firebase-backed storage for Aria messages
import { db, collection, addDoc, query, where, getDocs, onSnapshot, serverTimestamp, orderBy, limit, deleteDoc, doc, setDoc, getDoc } from '../firebase';

const ARIA_COLLECTION = 'arias';
const USER_CODES_COLLECTION = 'userCodes';

export const saveAria = async (aria) => {
  try {
    const toSave = {
      recipient: aria.recipient || '',
      message: aria.message || '',
      songLink: aria.songLink || aria.songURL || '',
      songURL: aria.songLink || aria.songURL || '', // Keep both for compatibility
      imageURL: aria.picture || aria.imageURL || null,
      senderName: aria.senderName || 'Anonymous',
      senderCode: aria.senderCode || aria.senderName || 'Anonymous',
      createdAt: serverTimestamp()
    };
    const docRef = await addDoc(collection(db, ARIA_COLLECTION), toSave);
    return { id: docRef.id, ...toSave };
  } catch (error) {
    console.error('Error saving aria to Firebase:', error);
    throw error;
  }
};

export const findAriaByRecipient = async (name) => {
  if (!name) return null;
  try {
    const q = query(
      collection(db, ARIA_COLLECTION),
      where('recipient', '==', name.trim()),
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const doc = querySnapshot.docs[0];
    return { 
      id: doc.id, 
      ...doc.data(),
      songLink: doc.data().songLink || doc.data().songURL || ''
    };
  } catch (error) {
    console.error('Error finding aria by recipient:', error);
    return null;
  }
};

export const getAllAria = async () => {
  try {
    const q = query(
      collection(db, ARIA_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      songLink: doc.data().songLink || doc.data().songURL || ''
    }));
  } catch (error) {
    console.error('Error getting all arias:', error);
    return [];
  }
};

export const getAriasBySender = async (senderName) => {
  if (!senderName) return [];
  try {
    const q = query(
      collection(db, ARIA_COLLECTION),
      where('senderCode', '==', senderName.trim()),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      songLink: doc.data().songLink || doc.data().songURL || ''
    }));
  } catch (error) {
    console.error('Error getting arias by sender:', error);
    return [];
  }
};

export const deleteAria = async (ariaId) => {
  if (!ariaId) return false;
  try {
    await deleteDoc(doc(db, ARIA_COLLECTION, ariaId));
    return true;
  } catch (error) {
    console.error('Error deleting aria:', error);
    return false;
  }
};

export const subscribeToArias = (callback, maxCount = 20) => {
  try {
    const q = query(
      collection(db, ARIA_COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(maxCount)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const arias = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        songLink: doc.data().songLink || doc.data().songURL || ''
      }));
      callback(arias);
    }, (error) => {
      console.error('Error listening to arias:', error);
    });
    return unsubscribe;
  } catch (error) {
    console.error('Error setting up aria subscription:', error);
    return () => {};
  }
};

// User Code Management Functions
export const checkCodeExists = async (code) => {
  if (!code) return false;
  try {
    const docRef = doc(db, USER_CODES_COLLECTION, code);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error('Error checking code existence:', error);
    return false;
  }
};

export const registerUserCode = async (code) => {
  if (!code || !/^\d{4}$/.test(code)) {
    throw new Error('Invalid code format');
  }

  try {
    await setDoc(doc(db, USER_CODES_COLLECTION, code), {
      code: code,
      createdAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error registering user code:', error);
    throw error;
  }
};

export const getAllUserCodes = async () => {
  try {
    const q = query(collection(db, USER_CODES_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error getting all user codes:', error);
    return [];
  }
};

export default {
  saveAria,
  findAriaByRecipient,
  getAllAria,
  getAriasBySender,
  deleteAria,
  subscribeToArias,
  checkCodeExists,
  registerUserCode,
  getAllUserCodes
};
