// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwbcBdQaHRefiJVwD7iDw3rqCELPch8tA",
  authDomain: "sentinel-assignment.firebaseapp.com",
  projectId: "sentinel-assignment",
  storageBucket: "sentinel-assignment.firebasestorage.app",
  messagingSenderId: "480549263927",
  appId: "1:480549263927:web:3ab7622c864681c0653db2",
  measurementId: "G-6V24VDLKYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);