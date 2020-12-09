import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDEM1XrBUcw4v0c-8Hp_1eEgH28XOYuTok",
  authDomain: "ninja-live-chat.firebaseapp.com",
  projectId: "ninja-live-chat",
  storageBucket: "ninja-live-chat.appspot.com",
  messagingSenderId: "368820473730",
  appId: "1:368820473730:web:e5267940fdad2f1be2099b"
};

// init firebase
firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirestore, timestamp }
