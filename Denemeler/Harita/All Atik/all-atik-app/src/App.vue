<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'App',

    beforeMount() {
      const settings = {};
      String(document.location.search).slice(1).split("&").forEach(parameter => {
        const [key, value] = parameter.split("=")
        settings[key] = value;
      })

      this.$store.dispatch("setSettings", settings);
      console.log(this.$store.getters.getSettings);
    }
  }
</script>
