// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVJogMgc14Jbl53g_9DOHTK5ybBex7xXg",
  authDomain: "nexux-825ac.firebaseapp.com",
  projectId: "nexux-825ac",
  storageBucket: "nexux-825ac.firebasestorage.app",
  messagingSenderId: "959521816603",
  appId: "1:959521816603:web:c649facb2324b8d8bff8be",
  measurementId: "G-V5HF5DF863"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// 🔹 logout helper
const logout = () => signOut(auth);

export { auth, googleProvider, logout };
