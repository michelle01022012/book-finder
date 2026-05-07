import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHVv0Dtl5ZR5lP5sAa8NK4beGfzQyze4s",
  authDomain: "book-finder-da628.firebaseapp.com",
  projectId: "book-finder-da628",
  storageBucket: "book-finder-da628.firebasestorage.app",
  messagingSenderId: "780257277785",
  appId: "1:780257277785:web:883f2b6937b5493b173e48"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;