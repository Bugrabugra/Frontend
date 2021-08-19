import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import firebase from "firebase/app";
import "firebase/auth";


let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    createApp(App)
      .component('QuillEditor', QuillEditor)
      .use(store)
      .use(router)
      .mount('#app');
    app = true;
  }
});


