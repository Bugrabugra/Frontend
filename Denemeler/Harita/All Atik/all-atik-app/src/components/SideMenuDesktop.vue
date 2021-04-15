<template>
  <div class="full-width">

    <!--Toolbar-->
    <SideMenuToolbar/>

    <!--Menu-->
    <q-card class="bg-white-1">
      <!--Doluluk oranı-->
      <q-expansion-item
        icon="poll"
        :label="$t('pageMainMap.expansionItems.headers.lblFullnessPercentages')"
        expand-separator
        default-opened
      >
        <SideMenuFullness/>
      </q-expansion-item>

      <!--Filtreler-->
      <q-expansion-item
        @click="$store.dispatch('expandContainerDetail', false)"
        icon="filter_alt"
        :label="$t('pageMainMap.expansionItems.headers.lblFilters')"
        expand-separator
        default-opened
        group="group"
      >
        <SideMenuFilters/>
      </q-expansion-item>

      <!--İşlemler-->
      <q-expansion-item
        @click="$store.dispatch('expandContainerDetail', false)"
        icon="public"
        group="group"
        :label="$t('pageMainMap.expansionItems.headers.lblSpatialOperations')"
        expand-separator
      >
        <SideMenuSpatialOperations/>
      </q-expansion-item>

      <!--Konteyner detay-->
      <q-expansion-item
        :value="expandContainerDetail"
        group="group"
        expand-separator
        icon="info"
        :label="$t('pageMainMap.expansionItems.headers.lblContainerDetail')"
      >
        <SideMenuContainerDetail/>
      </q-expansion-item>
    </q-card>
  </div>
</template>

<script>
  import SideMenuToolbar from "components/MainMapPage/SideMenuToolbar";
  import SideMenuContainerDetail from "components/MainMapPage/SideMenuContainerDetail";
  import SideMenuFullness from "components/MainMapPage/SideMenuFullness";
  import SideMenuFilters from "components/MainMapPage/SideMenuFilters";
  import SideMenuSpatialOperations from "components/MainMapPage/SideMenuSpatialOperations";
  import {mapGetters} from "vuex";


  export default {
    name: "SideMenuDesktop",

    components: {
      SideMenuSpatialOperations,
      SideMenuFilters,
      SideMenuFullness,
      SideMenuContainerDetail,
      SideMenuToolbar
    },

    computed: {
      ...mapGetters([
        "expandContainerDetail"
      ])
    }
  }
</script>

<style>
  .q-item__section--avatar {
    min-width: 0;
  }

  .q-item__section--side {
    padding-right: 5px;
  }

  .q-item__section--side .q-expansion-item__container .material-icons.q-icon.notranslate {
    color: #6d7171;
  }

  .q-item__section.column.q-item__section--avatar .material-icons.q-icon.notranslate {
    color: #6d7171;
  }

</style>
