import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDGaKh2pBGoNtBRUpdTCHXKC02UQ4lfCJQ",
  authDomain: "myapplication-26ed9f1d.firebaseapp.com",
  projectId: "myapplication-26ed9f1d",
  storageBucket: "myapplication-26ed9f1d.firebasestorage.app",
  messagingSenderId: "103806848300",
  appId: "1:103806848300:web:3c06a85ba48c42b74ab089"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };