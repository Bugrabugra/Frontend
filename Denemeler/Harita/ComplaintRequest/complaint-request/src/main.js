import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Chart from 'chart.js'
import VueChartkick from 'vue-chartkick'

Vue.config.productionTip = false;
Vue.use(VueChartkick, { adapter: Chart });

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
