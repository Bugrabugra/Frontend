import firebase from "firebase/app";
import "firebase/database";


const config = {
  apiKey: "AIzaSyA740upT6JoO3WCAbiDm1VfHhy1_Royltk",
  authDomain: "firechat-vue-2b50c.firebaseapp.com",
  databaseURL: "https://firechat-vue-2b50c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "firechat-vue-2b50c",
  storageBucket: "firechat-vue-2b50c.appspot.com",
  messagingSenderId: "502718722995",
  appId: "1:502718722995:web:148c7383371d5da6f4d1c6"
}

const db = firebase.initializeApp(config);

export default db;