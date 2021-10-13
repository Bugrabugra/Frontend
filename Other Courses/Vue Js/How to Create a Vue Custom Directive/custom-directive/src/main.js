import { createApp } from 'vue'
import App from './App.vue'


const app = createApp(App);

app.directive("font-size", {
  // directive = v-font-size
  beforeMount: (el, binding) => {
    let size = 12;

    // argument = binding.arg (v-font-size:small)
    switch (binding.arg) {
      case "small":
        size = 8;
        break;
      case "large":
        size = 24;
        break;
    };

    if (binding.modifiers.veryLarge) {
      size = 40
    }

    if (binding.modifiers.red) {
      el.style.color = "#ff0000";
    }

    el.style.fontSize = size + "px";
  },
  updated: (el, binding) => {
    el.style.fontSize = binding.value + "px";
  },
})

app.mount('#app')
