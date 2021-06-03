import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_QjSX4tCFu_qaz6hL0g6adj9shkcD128",
  authDomain: "net-ninja-marioplan-cea97.firebaseapp.com",
  databaseURL: "https://net-ninja-marioplan-cea97.firebaseio.com",
  projectId: "net-ninja-marioplan-cea97",
  storageBucket: "net-ninja-marioplan-cea97.appspot.com",
  messagingSenderId: "175503004478",
  appId: "1:175503004478:web:ed0eec657fef1d342a926f",
  measurementId: "G-X3XKD2RFEK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;