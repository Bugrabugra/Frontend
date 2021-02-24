import Vue from 'vue'
import App from './App.vue'

Vue.directive("myon", (el, binding, vnode) => {
  el.onclick = () => {
    binding.value();
    if (binding.arg === "abs") {
      alert("abs")
      if (binding.modifiers["more"]) {
        alert("more");
      }
    }
  }

})

new Vue({
  el: '#app',
  render: h => h(App)
})
