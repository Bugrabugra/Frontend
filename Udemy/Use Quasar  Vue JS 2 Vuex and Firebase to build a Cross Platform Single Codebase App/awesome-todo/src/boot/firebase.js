import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBc6BU2HHWXcH0ruLcTgA8ZwQ1BkT7aE0U",
  authDomain: "awesome-todo-cdc18.firebaseapp.com",
  databaseURL: "https://awesome-todo-cdc18-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "awesome-todo-cdc18",
  storageBucket: "awesome-todo-cdc18.appspot.com",
  messagingSenderId: "1076710961008",
  appId: "1:1076710961008:web:5542842e5e8b06626429b5"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

export {firebaseAuth, firebaseDb};
