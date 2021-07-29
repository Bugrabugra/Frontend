import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyDFS4ToZLWYckSB-lBenyHntpGO8dQttps",
  authDomain: "vue-auth-49fd1.firebaseapp.com",
  projectId: "vue-auth-49fd1",
  storageBucket: "vue-auth-49fd1.appspot.com",
  messagingSenderId: "462949370172",
  appId: "1:462949370172:web:4886c88e150833cd28b639"
};

firebase.initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app')
