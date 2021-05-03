import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"


const firebaseConfig = {
  apiKey: "AIzaSyB8YxHuEWiCT53ms6GIkMvqBX-f-wQZdWc",
  authDomain: "smackchat-1d584.firebaseapp.com",
  databaseURL: "https://smackchat-1d584-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "smackchat-1d584",
  storageBucket: "smackchat-1d584.appspot.com",
  messagingSenderId: "814897658680",
  appId: "1:814897658680:web:80b784f7a09441c426dfcd"

};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();
const firebaseDb = firebaseApp.database();

export {firebaseAuth, firebaseDb};
