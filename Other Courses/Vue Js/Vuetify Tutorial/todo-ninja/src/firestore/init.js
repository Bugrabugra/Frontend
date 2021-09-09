import firebase from "firebase";
// import firestore from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7cLibwZRchXxQ6As40DyDqe1W5MRUpVM",
  authDomain: "ninja-todo-1ff2f.firebaseapp.com",
  databaseURL: "https://ninja-todo-1ff2f.firebaseio.com",
  projectId: "ninja-todo-1ff2f",
  storageBucket: "ninja-todo-1ff2f.appspot.com",
  messagingSenderId: "1074235796752",
  appId: "1:1074235796752:web:b9f360cda26e9bf57f4995"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;