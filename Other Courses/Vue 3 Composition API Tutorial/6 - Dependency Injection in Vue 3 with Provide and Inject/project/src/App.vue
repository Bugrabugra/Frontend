<template>
  <SettingsProvider>
    <ThemeButton/>
  </SettingsProvider>
</template>

<script>
  import SettingsProvider from "./components/SettingsProvider";
  import ThemeButton from "./components/ThemeButton";


  export default {
    name: 'App',
    components: {
      ThemeButton,
      SettingsProvider},
  }
</script>
