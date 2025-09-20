import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-kBTpoN2YLSJ3RGWVP-R8P5sQ-OlA0-o",
  authDomain: "agrichain-5ef9a.firebaseapp.com",
  projectId: "agrichain-5ef9a",
  storageBucket: "agrichain-5ef9a.firebasestorage.app",
  messagingSenderId: "261379074760",
  appId: "1:261379074760:web:b329c3fe4c78b26c6853fd",
  measurementId: "G-SJLBZNT37E" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);