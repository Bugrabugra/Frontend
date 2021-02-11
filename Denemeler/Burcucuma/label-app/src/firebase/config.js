import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRPmNC569TkazM9JjtC9PBdsP0a08JFDs",
  authDomain: "eskitadinda-etiket.firebaseapp.com",
  projectId: "eskitadinda-etiket",
  storageBucket: "eskitadinda-etiket.appspot.com",
  messagingSenderId: "387729109910",
  appId: "1:387729109910:web:3148b952ddeb30c50123b7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
export const auth = firebase.auth();

