// Firebase Configuration
// Replace with your actual Firebase project credentials
// Get these from: https://console.firebase.google.com/
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs, onSnapshot, serverTimestamp, orderBy, limit, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Make db available globally for components
window.db = db;

// Export Firestore and Auth functions
export { db, auth, collection, addDoc, query, where, getDocs, onSnapshot, serverTimestamp, orderBy, limit, deleteDoc, doc, setDoc, getDoc };
