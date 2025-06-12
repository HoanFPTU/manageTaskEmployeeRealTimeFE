// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCYFbcsIuKAGJnKq74bdhsZcoT8lwI0_x4",
  authDomain: "interviewproject-55769.firebaseapp.com",
  databaseURL:
    "https://interviewproject-55769-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "interviewproject-55769",
  storageBucket: "interviewproject-55769.firebasestorage.app",
  messagingSenderId: "870687218095",
  appId: "1:870687218095:web:cdc3286ef3e50146d8b75a",
  measurementId: "G-S9C6YY9FM8",
};

// Initialize Firebase
console.log("firebase init");
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getDatabase(app);
const analytics = getAnalytics(app);
export { db, app, analytics };
