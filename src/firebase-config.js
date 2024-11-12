// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCz7JVh7EIqt3IDPrA520vCzogDTxFMpcI",
    authDomain: "coworking-reservations.firebaseapp.com",
    projectId: "coworking-reservations",
    storageBucket: "coworking-reservations.firebasestorage.app",
    messagingSenderId: "527084891013",
    appId: "1:527084891013:web:d170570a59a97f886eb2ec"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };