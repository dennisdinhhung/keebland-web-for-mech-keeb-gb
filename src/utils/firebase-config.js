// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5IKKiv0Sfv2XXgw1NiaQrQWRklzt22Rg",
  authDomain: "keebland-thesis.firebaseapp.com",
  projectId: "keebland-thesis",
  storageBucket: "keebland-thesis.appspot.com",
  messagingSenderId: "771640514323",
  appId: "1:771640514323:web:807c3887d3c00b48746ce6",
  measurementId: "G-PTC4G8GY2L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const auth = getAuth(app);