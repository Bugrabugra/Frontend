// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9w4NlJ_nBvgYztAkMxGXUm-GMIlIYnAs",
  authDomain: "disney-plus-clone-665dc.firebaseapp.com",
  projectId: "disney-plus-clone-665dc",
  storageBucket: "disney-plus-clone-665dc.appspot.com",
  messagingSenderId: "813849414034",
  appId: "1:813849414034:web:4aee252bfc434efb64194b",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;