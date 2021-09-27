import { createApp } from 'vue';
import App from './App.vue';
import store from "./store";
import router from "./router"
import "./assets/css/styles.css";

createApp(App).use(store).use(router).mount('#app')