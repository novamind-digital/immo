import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Use Vite's import.meta.env instead of process.env
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD_SRy25NzyRLDowZD1lOFJNBkPPO7dssA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "immo-41e9e.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "immo-41e9e",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "immo-41e9e.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1014818169720",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1014818169720:web:c5c63d4a0092a424d11e8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;