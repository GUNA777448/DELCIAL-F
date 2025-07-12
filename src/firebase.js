import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr2y7j-zy1HvJwJ03yeSzoD5_P7h4chFI",
  authDomain: "delicial-1cdd7.firebaseapp.com",
  projectId: "delicial-1cdd7",
  storageBucket: "delicial-1cdd7.firebasestorage.app",
  messagingSenderId: "193401528963",
  appId: "1:193401528963:web:73dd075e88f3f256b971b6",
  measurementId: "G-9Q4W3V5X9X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Auth providers
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, analytics };
