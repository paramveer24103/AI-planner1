// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPjltEv_JKZ2a1Wohg_RfxX8VfSciQ2kY",
  authDomain: "ai-trip-planner-50b93.firebaseapp.com",
  databaseURL: "https://ai-trip-planner-50b93-default-rtdb.firebaseio.com",
  projectId: "ai-trip-planner-50b93",
  storageBucket: "ai-trip-planner-50b93.firebasestorage.app",
  messagingSenderId: "1009343698985",
  appId: "1:1009343698985:web:6dd443e231d9b012982438",
  measurementId: "G-Y7D1G0XKEH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Note: Analytics is not directly supported in React Native
// If you need analytics, consider using a React Native specific package