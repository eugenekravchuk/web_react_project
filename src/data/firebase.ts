// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVlKlHO6ZQ1p2OK1imhtuRMPRuqwxAx9M",
  authDomain: "furry-magazine.firebaseapp.com",
  databaseURL: "https://furry-magazine-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "furry-magazine",
  storageBucket: "furry-magazine.firebasestorage.app",
  messagingSenderId: "196179623918",
  appId: "1:196179623918:web:38ff8180f525cce67a18ff",
  measurementId: "G-TRBJJ3RN9Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);