import firebase from "firebase";
import firestore from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC78NAUNx5Cl5eSDwuhv2JHEYCgVZr-6Os",
  authDomain: "ninja-chat-beb76.firebaseapp.com",
  databaseURL: "https://ninja-chat-beb76.firebaseio.com",
  projectId: "ninja-chat-beb76",
  storageBucket: "ninja-chat-beb76.appspot.com",
  messagingSenderId: "219063946931",
  appId: "1:219063946931:web:ed38323d406e0c2a3b2ac6"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
