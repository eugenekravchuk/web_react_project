import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVlKlHO6ZQ1p2OK1imhtuRMPRuqwxAx9M",
  authDomain: "furry-magazine.firebaseapp.com",
  databaseURL:
    "https://furry-magazine-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "furry-magazine",
  storageBucket: "furry-magazine.firebasestorage.app",
  messagingSenderId: "196179623918",
  appId: "1:196179623918:web:38ff8180f525cce67a18ff",
  measurementId: "G-TRBJJ3RN9Q",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
