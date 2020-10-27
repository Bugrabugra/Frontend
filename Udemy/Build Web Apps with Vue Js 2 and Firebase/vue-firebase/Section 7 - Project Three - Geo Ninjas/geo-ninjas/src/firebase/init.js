import firebase from "firebase";
import firestore from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEgTxO5GJrLFeqwEQm5nlTm-zOLIVX9MU",
  authDomain: "ninja-geo-a2b00.firebaseapp.com",
  databaseURL: "https://ninja-geo-a2b00.firebaseio.com",
  projectId: "ninja-geo-a2b00",
  storageBucket: "ninja-geo-a2b00.appspot.com",
  messagingSenderId: "990519165868",
  appId: "1:990519165868:web:89f278ea3d24e74901f009"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
