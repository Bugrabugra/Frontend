import firebase from "firebase/app";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBbe6oHfcBeYVHP9jXJltKAi5_7dCuRwJg",
  authDomain: "vue-invoice-16260.firebaseapp.com",
  projectId: "vue-invoice-16260",
  storageBucket: "vue-invoice-16260.appspot.com",
  messagingSenderId: "72160500119",
  appId: "1:72160500119:web:f2edcf8bbe75850e92ccd2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();