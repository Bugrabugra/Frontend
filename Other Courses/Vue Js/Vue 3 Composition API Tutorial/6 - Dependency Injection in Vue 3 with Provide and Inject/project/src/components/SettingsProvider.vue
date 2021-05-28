<template>
  <slot/>
</template>

<script>
  import {provide, reactive, watch} from "vue";


  export default {
    name: 'SettingsProvider',

    setup() {
      const settings = reactive({
        theme: "light"
      })

      provide("settings", settings);

      watch(settings, settings => {
        console.log(`SettingsProvider: theme has been switched to ${settings.theme} mode.`)
      })
    }
  }
</script>