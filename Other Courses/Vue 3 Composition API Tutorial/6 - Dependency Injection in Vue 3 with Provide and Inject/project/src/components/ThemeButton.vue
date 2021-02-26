<template>
  <button
      :class="{'dark-mode': settings.theme === 'dark'}"
      @click="toggleMode"
  >
    Switch to {{oppositeTheme}} mode
  </button>
</template>

<script>
  import {inject, computed} from "vue";


  export default {
    name: "ThemeButton",

    setup() {
      const settings = inject("settings");
      const oppositeTheme = computed(() => {
        return settings.theme === "dark" ? "light" : "dark"
      })

      const toggleMode = () => {
        return settings.theme = oppositeTheme.value;
      }

      return {settings, oppositeTheme, toggleMode}
    }
  }
</script>

<style scoped>
  .dark-mode {
    color: white;
    background-color: black;
  }
</style>