import firebase from "firebase/app";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDzcX_YSZRMAqj8PFUbiCtjseOIjtZLQZY",
  authDomain: "fireblog-28638.firebaseapp.com",
  projectId: "fireblog-28638",
  storageBucket: "fireblog-28638.appspot.com",
  messagingSenderId: "25556838529",
  appId: "1:25556838529:web:301b2170c2945b47708580"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {timestamp};
export default firebaseApp.firestore();