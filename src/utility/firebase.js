import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Correct import for Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqV_fgeNQPiYJzv3JHCsPDIHIVk2m4U0E",
  authDomain: "clone-42ed9.firebaseapp.com",
  projectId: "clone-42ed9",
  storageBucket: "clone-42ed9.appspot.com",
  messagingSenderId: "172772592629",
  appId: "1:172772592629:web:f14d24535b625e144eeebc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Correct initialization for Firestore
