// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDv9x7bXIaMJ1rdlBbaQrFqSmtWmhPEtrk",
  authDomain: "delicial-5a1f0.firebaseapp.com",
  projectId: "delicial-5a1f0",
  storageBucket: "delicial-5a1f0.appspot.com",
  messagingSenderId: "862931410572",
  appId: "1:862931410572:web:0624881a010cf86a92a5a9",
  measurementId: "G-ZN66B1M0YX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth and Google provider setup
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
