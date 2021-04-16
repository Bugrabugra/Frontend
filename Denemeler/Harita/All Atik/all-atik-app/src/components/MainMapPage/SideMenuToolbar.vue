<template>
  <q-toolbar class="text-primary bg-grey-8 text-white">
    <q-toolbar-title>
      {{$t('pageMainMap.toolbar.lblContainerCount')}} <span v-if="getContainers">{{containersCount}}</span>
    </q-toolbar-title>

    <!--TODO Change language-->
    <!--<q-btn-->
    <!--  @click="toggleLanguage"-->
    <!--  color="indigo-2"-->
    <!--  flat-->
    <!--  round-->
    <!--  :icon="$i18n.locale === 'tr-tr' ? 'img:/icons/flags/uk.png' : 'img:/icons/flags/turkey.png'"-->
    <!--/>-->

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

      toggleLanguage() {
        if (this.$i18n.locale === "tr-tr") {
          this.$i18n.locale = "en-en";
        } else {
          this.$i18n.locale = "tr-tr";
        }
      }
    }
  }
</script>
