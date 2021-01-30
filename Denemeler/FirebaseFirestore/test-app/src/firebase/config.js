import firebase from "firebase/app";
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCpG1PT_FHKA2HzaCX20hh1UAVFNjh4iuc",
  authDomain: "ninja-firestore-tutorial-58af1.firebaseapp.com",
  projectId: "ninja-firestore-tutorial-58af1",
  storageBucket: "ninja-firestore-tutorial-58af1.appspot.com",
  messagingSenderId: "855463722975",
  appId: "1:855463722975:web:4a7d9fb45d90640d334e6a"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

export default db;


