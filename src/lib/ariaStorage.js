// Firebase-backed storage with a local copy so sent Arias survive refreshes
// while Firestore is unavailable or still synchronising.
import { db, collection, addDoc, query, where, getDocs, onSnapshot, serverTimestamp, orderBy, limit, deleteDoc, doc, setDoc, getDoc } from '../firebase';

const ARIA_COLLECTION = 'arias';
const USER_CODES_COLLECTION = 'userCodes';
const LOCAL_ARIA_KEY = 'hariah:arias';

const toKey = value => (value || '').trim().toLocaleLowerCase();
const toMillis = value => {
  if (value?.toDate) return value.toDate().getTime();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
};
const sortNewestFirst = arias => [...arias].sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt));
const normalizeAria = aria => {
  const imageURL = aria.imageURL || aria.picture || null;
  return {
    ...aria,
    picture: aria.picture || imageURL,
    imageURL,
    songLink: aria.songLink || aria.songURL || '',
    recipientKey: aria.recipientKey || toKey(aria.recipient),
    senderCodeKey: aria.senderCodeKey || toKey(aria.senderCode)
  };
};

const getLocalArias = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(LOCAL_ARIA_KEY) || '[]');
    return Array.isArray(saved) ? saved.map(normalizeAria) : [];
  } catch {
    return [];
  }
};

const setLocalArias = arias => localStorage.setItem(LOCAL_ARIA_KEY, JSON.stringify(arias));

const mergeArias = (...lists) => {
  const byId = new Map();
  lists.flat().forEach(aria => byId.set(aria.id, normalizeAria(aria)));
  return sortNewestFirst([...byId.values()]);
};

const saveLocalAria = aria => {
  const localAria = normalizeAria({
    ...aria,
    id: `local_${crypto.randomUUID?.() || Date.now()}`,
    createdAt: new Date().toISOString(),
    pending: true
  });
  setLocalArias(mergeArias(getLocalArias(), [localAria]));
  return localAria;
};

const replaceLocalAria = (localId, persistedAria) => {
  const next = getLocalArias().map(aria => aria.id === localId ? normalizeAria(persistedAria) : aria);
  setLocalArias(mergeArias(next));
};

const removeLocalAria = ariaId => setLocalArias(getLocalArias().filter(aria => aria.id !== ariaId));

const toFirebaseAria = aria => ({
  recipient: aria.recipient || '',
  recipientKey: toKey(aria.recipient),
  message: aria.message || '',
  songLink: aria.songLink || aria.songURL || '',
  songURL: aria.songLink || aria.songURL || '',
  imageURL: aria.picture || aria.imageURL || null,
  senderName: aria.senderName || 'Anonymous',
  senderCode: aria.senderCode || aria.senderName || 'Anonymous',
  senderCodeKey: toKey(aria.senderCode || aria.senderName || 'Anonymous'),
  createdAt: serverTimestamp()
});

export const syncPendingArias = async () => {
  const pending = getLocalArias().filter(aria => aria.pending);
  for (const aria of pending) {
    try {
      const docRef = await addDoc(collection(db, ARIA_COLLECTION), toFirebaseAria(aria));
      replaceLocalAria(aria.id, {
        ...aria,
        id: docRef.id,
        pending: false
      });
    } catch (error) {
      console.error('Error syncing pending aria:', error);
    }
  }
};

export const saveAria = async aria => {
  const localAria = saveLocalAria(aria);
  const toSave = toFirebaseAria(aria);

  try {
    const docRef = await addDoc(collection(db, ARIA_COLLECTION), toSave);
    const persistedAria = {
      ...localAria,
      ...toSave,
      id: docRef.id,
      createdAt: localAria.createdAt,
      pending: false
    };
    replaceLocalAria(localAria.id, persistedAria);
    return persistedAria;
  } catch (error) {
    // The local record is intentionally retained for the sender; pending
    // arias are retried when the app reconnects or on the next subscribe.
    console.error('Error saving aria to Firebase:', error);
    return localAria;
  }
};

const snapshotToArias = snapshot => snapshot.docs.map(item => normalizeAria({ id: item.id, ...item.data() }));

export const findAriasByRecipient = async name => {
  const recipient = name?.trim();
  if (!recipient) return [];
  const key = toKey(recipient);
  const localMatches = getLocalArias().filter(aria => aria.recipientKey === key);

  try {
    // A single-field equality query needs no composite Firestore index.
    const keyed = await getDocs(query(collection(db, ARIA_COLLECTION), where('recipientKey', '==', key)));
    const legacy = await getDocs(query(collection(db, ARIA_COLLECTION), where('recipient', '==', recipient)));
    return mergeArias(localMatches, snapshotToArias(keyed), snapshotToArias(legacy));
  } catch (error) {
    console.error('Error finding arias by recipient:', error);
    return sortNewestFirst(localMatches);
  }
};

export const getAllAria = async () => {
  const localArias = getLocalArias();
  try {
    const q = query(collection(db, ARIA_COLLECTION), orderBy('createdAt', 'desc'));
    return mergeArias(localArias, snapshotToArias(await getDocs(q)));
  } catch (error) {
    console.error('Error getting all arias:', error);
    return sortNewestFirst(localArias);
  }
};

export const getAriasBySender = async senderCode => {
  const code = senderCode?.trim();
  if (!code) return [];
  const key = toKey(code);
  const localMatches = getLocalArias().filter(aria => aria.senderCodeKey === key);

  try {
    const keyed = await getDocs(query(collection(db, ARIA_COLLECTION), where('senderCodeKey', '==', key)));
    const legacy = await getDocs(query(collection(db, ARIA_COLLECTION), where('senderCode', '==', code)));
    return mergeArias(localMatches, snapshotToArias(keyed), snapshotToArias(legacy));
  } catch (error) {
    console.error('Error getting arias by sender:', error);
    return sortNewestFirst(localMatches);
  }
};

export const deleteAria = async ariaId => {
  if (!ariaId) return false;
  removeLocalAria(ariaId);
  if (ariaId.startsWith('local_')) return true;
  try {
    await deleteDoc(doc(db, ARIA_COLLECTION, ariaId));
    return true;
  } catch (error) {
    console.error('Error deleting aria:', error);
    return false;
  }
};

export const subscribeToArias = (callback, maxCount = 20) => {
  let lastRemote = [];
  let firestoreUnsubscribe = () => {};

  const emit = () => {
    const merged = mergeArias(getLocalArias(), lastRemote);
    console.log('Emitting arias:', merged.length, 'total');
    callback(merged.slice(0, maxCount));
  };

  const onStorage = event => {
    if (event.key === LOCAL_ARIA_KEY || event.key === null) {
      console.log('Storage event detected, emitting arias');
      emit();
    }
  };

  const startListener = () => {
    try {
      const q = query(collection(db, ARIA_COLLECTION), orderBy('createdAt', 'desc'), limit(maxCount));
      firestoreUnsubscribe = onSnapshot(
        q,
        snapshot => {
          lastRemote = snapshotToArias(snapshot);
          console.log('Firestore snapshot received:', lastRemote.length, 'arias');
          emit();
        },
        error => {
          console.error('Error listening to arias:', error);
          emit();
        }
      );
    } catch (error) {
      console.error('Error setting up aria subscription:', error);
      emit();
    }
  };

  void syncPendingArias().finally(() => {
    console.log('Pending arias synced, starting listener');
    emit();
    startListener();
  });

  window.addEventListener('storage', onStorage);

  return () => {
    firestoreUnsubscribe();
    window.removeEventListener('storage', onStorage);
  };
};

export const checkCodeExists = async code => {
  if (!code) return false;
  try {
    return (await getDoc(doc(db, USER_CODES_COLLECTION, code))).exists();
  } catch {
    return false;
  }
};

export const registerUserCode = async code => {
  if (!code || !/^\d{4}$/.test(code)) throw new Error('Invalid code format');
  await setDoc(doc(db, USER_CODES_COLLECTION, code), { code, createdAt: serverTimestamp() }, { merge: true });
  return true;
};

export const getAllUserCodes = async () => {
  try {
    return (await getDocs(query(collection(db, USER_CODES_COLLECTION), orderBy('createdAt', 'desc')))).docs.map(item => item.data());
  } catch {
    return [];
  }
};

export default { saveAria, findAriasByRecipient, getAllAria, getAriasBySender, deleteAria, subscribeToArias, syncPendingArias, checkCodeExists, registerUserCode, getAllUserCodes };
