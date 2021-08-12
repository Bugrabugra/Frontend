import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';


createApp(App)
  .component('QuillEditor', QuillEditor)
  .use(store)
  .use(router)
  .mount('#app')
