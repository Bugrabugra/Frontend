import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;
Vue.directive("sticky", {
  bind(el, binding, vnode) {
    if (binding.arg === "bottom") {
      el.style.position = "fixed";
      el.style.bottom = "0px";
      el.style.width = "100%";
    } else {
      el.style.position = "sticky";
      el.style.top = "0px";
    }

    if (binding.modifiers.light) {
      el.style.background = "#ccc"
    }
  }
});

Vue.directive("color", {
  bind(el, binding, vnode) {
    el.style.color = binding.value;
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
