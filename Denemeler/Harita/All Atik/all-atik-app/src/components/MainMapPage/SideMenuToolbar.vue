<template>
  <q-toolbar class="text-primary bg-grey-8 text-white">
    <q-toolbar-title>
      Konteyner Adet: <span v-if="getContainers">{{containersCount}}</span>
    </q-toolbar-title>

    <q-icon
      name="zoom_out_map"
      size="md"
      style="cursor:pointer; color: #ffffff;"
      @click="resetView"
    />
  </q-toolbar>
</template>

<script>
  import {mapGetters} from "vuex";


  export default {
    name: "SideMenuToolbar",

    computed: {
      ...mapGetters([
        "getContainers"
      ]),

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
