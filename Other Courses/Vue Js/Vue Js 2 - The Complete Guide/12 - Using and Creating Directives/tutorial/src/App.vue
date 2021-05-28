<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Directives</h1>
        <p v-text="'Some text'"></p>
        <p v-html="'<strong>Some text</strong>'"></p>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Custom Directives</h1>
        <p v-highlight:background.delayed="'orange'">Color this</p>
        <p v-local-highlight:background.delayed="'orange'">Color this too</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    directives: {
      "local-highlight": {
        bind(el, binding, vnode) {
          // el.style.backgroundColor = "green";
          // el.style.backgroundColor = binding.value;
          let delay = 0;
          if (binding.modifiers["delayed"]) {
            delay = 3000;
          }
          if (binding.modifiers["blink"]) {
            let mainColor = binding.value;
            let secondColor = "blue";
            let currentColor = mainColor;
            setTimeout(() => {
              setInterval(() => {
                currentColor === secondColor ? currentColor = mainColor : currentColor = secondColor;
                if (binding.arg == 'background') {
                  el.style.backgroundColor = currentColor;
                } else {
                  el.style.color = currentColor;
                }
              }, 1000)

            }, delay);
          } else {
            setTimeout(() => {
              if (binding.arg == 'background') {
                el.style.backgroundColor = binding.value;
              } else {
                el.style.color = binding.value;
              }
            }, delay);
          }

        }
      }
    }
  }
</script>

<style>

</style>
