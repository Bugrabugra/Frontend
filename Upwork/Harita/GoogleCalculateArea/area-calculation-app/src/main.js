import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

export const loadedGoogleMapsAPI = new Promise( (resolve,reject) => {
  window['GoogleMapsInit'] = resolve;
  let GMap = document.createElement('script');

  GMap.setAttribute('src',
    `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_G_API_KEY}&callback=GoogleMapsInit&libraries=drawing,geometry,places`);

  document.body.appendChild(GMap);
});


new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
