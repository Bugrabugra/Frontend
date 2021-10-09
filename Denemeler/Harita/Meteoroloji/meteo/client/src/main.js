import { createApp } from 'vue';
import App from './App.vue';
import store from "./store";
import router from "./router";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl/dist/mapbox-gl";
import "./assets/css/styles.css";
// import "animate.css";


createApp(App).use(store).use(router).mount('#app')