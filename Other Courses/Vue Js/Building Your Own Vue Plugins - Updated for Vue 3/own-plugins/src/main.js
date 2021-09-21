import { createApp } from 'vue'
import App from './App.vue'
import MyFirstPlugin from "./plugins/MyFirstPlugin";


createApp(App)
  .use(MyFirstPlugin, {
    fontSize: {
      small: 12,
      medium: 24,
      large: 36
    }
  })
  .mount('#app')
