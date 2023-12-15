import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'primetravel-162f2.firebaseapp.com',
  databaseURL: 'https://primetravel-162f2-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'primetravel-162f2',
  storageBucket: 'primetravel-162f2.appspot.com',
  messagingSenderId: '297709839098',
  appId: '1:297709839098:web:1e1fefe3ac3a41444e9f43',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
