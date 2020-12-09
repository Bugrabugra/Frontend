import firebase from "firebase/app";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCoUKs6yQer1JgoI4KyR4UnphRe2p4FF4Y",
  authDomain: "ninja-project-planner.firebaseapp.com",
  projectId: "ninja-project-planner",
  storageBucket: "ninja-project-planner.appspot.com",
  messagingSenderId: "938106882608",
  appId: "1:938106882608:web:9ac307754c2d14ff46bbf5"
};

// Init firebase
firebase.initializeApp(firebaseConfig);

// Init firestore service
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {projectFirestore, timestamp};