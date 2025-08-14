import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFmIOY4D5oi9FFtAKcj4h4S6bDeMm5m-M",
  authDomain: "homework-website-d97b6.firebaseapp.com",
  projectId: "homework-website-d97b6",
  storageBucket: "homework-website-d97b6.firebasestorage.app",
  messagingSenderId: "173760175383",
  appId: "1:173760175383:web:7b71c3961d4e3df94bab52",
  measurementId: "G-1Y446CPKV5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.useDeviceLanguage();

initializeFirestore(app, 
  {localCache: 
    persistentLocalCache(/*settings*/{tabManager: persistentMultipleTabManager()})
  });

export const db = getFirestore(app);