// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging/sw";
import { getFirestore } from "firebase/firestore";

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const messaging = getMessaging(app);
const db = getFirestore(app);

export { app, auth, messaging, db };