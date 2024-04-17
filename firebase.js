// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_Xc67rdJzF1vHRoDhX7eXDPPYbhKPVw4",
  authDomain: "recipe-app-b5d59.firebaseapp.com",
  projectId: "recipe-app-b5d59",
  storageBucket: "recipe-app-b5d59.appspot.com",
  messagingSenderId: "572660057870",
  appId: "1:572660057870:web:553705a59b5f0888a7395f",
  measurementId: "G-3JPS2YR9DR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);