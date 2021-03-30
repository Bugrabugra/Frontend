<template>
  <div class="full-width">

    <!--Toolbar-->
    <SideMenuToolbar/>

    <!--Menu-->
    <q-card class="bg-white-1">
      <!--Doluluk oranı-->
      <q-expansion-item
        icon="poll"
        label="Doluluk Oranları"
        expand-separator
        default-opened
      >
        <SideMenuFullness/>
      </q-expansion-item>

      <!--Filtreler-->
      <q-expansion-item
        @click="$store.dispatch('expandContainerDetail', false)"
        icon="filter_alt"
        label="Filtreler"
        expand-separator
        default-opened
        group="group"
      >
        <SideMenuFilters/>
      </q-expansion-item>

      <!--Konteyner detay-->
      <q-expansion-item
        :value="$store.getters.expandContainerDetail"
        group="group"
        expand-separator
        icon="info"
        label="Konteyner Detay"
      >
        <SideMenuContainerDetail/>
      </q-expansion-item>
    </q-card>
  </div>
</template>

<script>
  import SideMenuToolbar from "components/SideMenuToolbar";
  import SideMenuContainerDetail from "components/SideMenuContainerDetail";
  import SideMenuFullness from "components/SideMenuFullness";
  import SideMenuFilters from "components/SideMenuFilters";


  export default {
    name: "SideMenuDesktop",

    components: {
      SideMenuFilters,
      SideMenuFullness,
      SideMenuContainerDetail,
      SideMenuToolbar
    },
  }
</script>

<style>
  .q-item__section--avatar {
    min-width: 0;
  }

  .q-item__section--side {
    padding-right: 5px;
  }

  /*.q-item.q-item-type {*/
  /*  border-bottom: #d5d4d4 1px solid;*/
  /*}*/
  .material-icons.q-icon.notranslate {
    color: #6d7171;
  }
</style>
