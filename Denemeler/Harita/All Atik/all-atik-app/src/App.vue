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
      console.log(settings)
      this.$store.dispatch("setSettings", settings);
    },

    mounted() {
      this.$i18n.locale = "tr-tr";
    }
  }
</script>

<style>
  .notifier-fire-risk .q-notification__actions{
    justify-content: space-between;
    padding: 0;
  }

  .notifier-fire-risk .q-notification__actions .q-btn__wrapper {
    padding-left: 0;
  }

  .close-button .q-btn__wrapper{
    padding-left: 16px;
    padding-right: 8px;
  }

  .notifier-fire-risk .q-notification__icon {
    margin-right: 12px;
  }
</style>
