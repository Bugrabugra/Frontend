<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
  import {mapActions} from "vuex";


  export default {
    name: 'App',

    methods: {
      ...mapActions("settings", ["getSettings"]),
      ...mapActions("auth", ["handleAuthStateChange"])
    },

    mounted() {
      if (this.$q.platform.is.electron) {
        require("electron").ipcRenderer.on("show-settings", () => {
          this.$router.push("/settings");
        })
      }

      this.getSettings();
      this.handleAuthStateChange();
    }
  }
</script>

<style>
  .text-strikethrough {
    text-decoration: line-through;
  }
</style>
