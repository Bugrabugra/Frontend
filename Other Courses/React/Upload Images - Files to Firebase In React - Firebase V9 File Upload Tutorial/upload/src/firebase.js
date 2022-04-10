import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA9C6sHe-7SVJ4VwQpfrCbLU8jw8ySfl_o",
  authDomain: "uploading-file-react.firebaseapp.com",
  projectId: "uploading-file-react",
  storageBucket: "uploading-file-react.appspot.com",
  messagingSenderId: "842762356486",
  appId: "1:842762356486:web:255b990bd6aa72fbc00087"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
