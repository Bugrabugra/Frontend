import firebase from "firebase";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzZC2Cphat8gqYkDlDVm_tFrbsHndKz4g",
  authDomain: "bugra-complaint-request.firebaseapp.com",
  databaseURL: "https://bugra-complaint-request.firebaseio.com",
  projectId: "bugra-complaint-request",
  storageBucket: "bugra-complaint-request.appspot.com",
  messagingSenderId: "192256671713",
  appId: "1:192256671713:web:8c4187ffc7e58eedf71ca0"
};
// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();