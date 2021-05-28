import firebase from "firebase/app";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBIDYUftxqmMMZqu2KrC1RHj2kk5cN7M_I",
  authDomain: "qwitter-4a699.firebaseapp.com",
  projectId: "qwitter-4a699",
  storageBucket: "qwitter-4a699.appspot.com",
  messagingSenderId: "665422834029",
  appId: "1:665422834029:web:60dc7b174d68e1bc355264"
}

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
