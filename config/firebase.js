// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDR52NaZY5wjAaDxJcwM6di04L0cxBFmco",
  authDomain: "web3-wotd.firebaseapp.com",
  projectId: "web3-wotd",
  storageBucket: "web3-wotd.appspot.com",
  messagingSenderId: "735109105347",
  appId: "1:735109105347:web:1cb5db2b3df71865a38476",
  measurementId: "G-4PYR3K2QBN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
