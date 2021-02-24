import Vue from 'vue'
import App from './App.vue'
import Tasks from "./components/Tasks";
import HelloWorld from "./components/HelloWorld";
import NotFound from "./components/NotFound";

Vue.config.productionTip = false

const routes = {
  "/": App,
  "/test": Tasks,
  "/hello": HelloWorld,
}

new Vue({
  data: {
    currentRoute: window.location.pathname
  },

  computed: {
    currentComponent() {
      return routes[this.currentRoute] || NotFound;
    }
  },

  render: function(h) {
    return h(this.currentComponent);
  },
}).$mount('#app')
