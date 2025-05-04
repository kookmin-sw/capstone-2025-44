// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging/sw";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAb8gPmyBEft0oRnRAr5uPwBQf8zMKo5yo",
  authDomain: "k-eum2023.firebaseapp.com",
  databaseURL: "https://k-eum2023-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "k-eum2023",
  storageBucket: "k-eum2023.appspot.com",
  messagingSenderId: "761364583261",
  appId: "1:761364583261:web:588b54a65b3d7ebf0f8eb4",
  measurementId: "G-7PKGPT6MEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const messaging = getMessaging(app);

export { app, auth, messaging };
