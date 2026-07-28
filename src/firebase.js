// Firebase Configuration
// Replace with your actual Firebase project credentials
// Get these from: https://console.firebase.google.com/
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs, onSnapshot, serverTimestamp, orderBy, limit, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Make db available globally for components
window.db = db;

// Export Firestore functions
export { db, collection, addDoc, query, where, getDocs, onSnapshot, serverTimestamp, orderBy, limit, deleteDoc, doc, setDoc, getDoc };
