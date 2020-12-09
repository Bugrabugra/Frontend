import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA7Oj7LB_b3mPWN_3MhViQfg-Dum-17u50",
  authDomain: "ninja-muso-ninjas.firebaseapp.com",
  projectId: "ninja-muso-ninjas",
  storageBucket: "ninja-muso-ninjas.appspot.com",
  messagingSenderId: "881995260259",
  appId: "1:881995260259:web:e555ffb458bb7c84e0f356"
};

// Init firebase
firebase.initializeApp(firebaseConfig);

// Init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage()

// Timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {projectFirestore, projectAuth, projectStorage, timestamp};