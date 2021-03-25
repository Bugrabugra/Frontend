<template>
  <q-toolbar class="text-primary bg-grey-8 text-white">
    <q-toolbar-title>
      Konteyner Adet: <span v-if="$store.getters.getContainers">{{containersCount}}</span>
    </q-toolbar-title>

    <q-icon
      name="zoom_out_map"
      size="md"
      style="cursor:pointer;"
      @click="resetView"
    />
  </q-toolbar>
</template>

<script>
  export default {
    name: "SideMenuToolbar",

    data() {
      return {}
    },

    computed: {
      containersCount() {
        return this.$store.getters.getContainers.length;
      },
    },

    methods: {
      resetView() {
        this.$store.dispatch("resetView", true);
      },
    }
  }
</script>

<style scoped>

</style>
