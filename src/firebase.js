import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_://firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_://appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

export const app = initializeApp(firebaseConfig);