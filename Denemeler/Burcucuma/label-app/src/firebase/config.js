import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9C3hqlpqNASRR4rqSxDMmVc0t8hSjsyw",
  authDomain: "etiket-uygulamasi-et.firebaseapp.com",
  projectId: "etiket-uygulamasi-et",
  storageBucket: "etiket-uygulamasi-et.appspot.com",
  messagingSenderId: "379015362685",
  appId: "1:379015362685:web:46e0e5adf17db482369914"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
export const auth = firebase.auth();

