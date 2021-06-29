import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueTextareaAutosize from "vue-textarea-autosize";
import firebase from "firebase/app";
import "firebase/firestore";


Vue.use(VueTextareaAutosize);
Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyD3ECXXf1aOvxirMgvrQlnZ3o1MXMzbkU4",
  authDomain: "vue-calendar-36b4b.firebaseapp.com",
  projectId: "vue-calendar-36b4b",
  storageBucket: "vue-calendar-36b4b.appspot.com",
  messagingSenderId: "451050055420",
  appId: "1:451050055420:web:3c3aef6424f0ac6cf25979"
});

export const db = firebase.firestore();

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
