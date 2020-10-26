import firebase from "firebase";
import firestore from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMucD2L5YTAabtF54vQHPaGuTw01k9e2A",
  authDomain: "ninja-smoothies-216b3.firebaseapp.com",
  databaseURL: "https://ninja-smoothies-216b3.firebaseio.com",
  projectId: "ninja-smoothies-216b3",
  storageBucket: "ninja-smoothies-216b3.appspot.com",
  messagingSenderId: "729813491749",
  appId: "1:729813491749:web:5c4881e2129928424cdfcc"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({timestampsInSnapshots: true});

// Export firestore database
export default firebaseApp.firestore()
