import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyDgaFOtb-eOyJ5IssgqBnbzVEsSBTADu1M",
  authDomain: "movie-app-d09de.firebaseapp.com",
  projectId: "movie-app-d09de",
  storageBucket: "movie-app-d09de.appspot.com",
  messagingSenderId: "873018066637",
  appId: "1:873018066637:web:d0a4e9aad3e4c111e74b84"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;