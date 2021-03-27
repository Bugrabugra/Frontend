<template>
  <div class="full-width">
    <div class="justify-center">
      <q-card>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="percentages" class="q-ma-none q-pa-none">
            <SideMenuFullness/>
          </q-tab-panel>

          <q-tab-panel name="filter" class="q-ma-none q-pa-none">
            <SideMenuFilters/>
          </q-tab-panel>

          <q-tab-panel name="info" class="q-ma-none q-pa-none">
            <SideMenuContainerDetail/>
          </q-tab-panel>
        </q-tab-panels>

        <q-separator/>

        <q-tabs
          v-model="tab"
          class="bg-grey-3"
          align="justify"
          narrow-indicator
          dense
        >
          <q-tab name="percentages" label="Doluluk" />
          <q-tab name="filter" label="Filtreler" />
          <q-tab name="info" label="Detay" />
        </q-tabs>
      </q-card>
    </div>
  </div>
</template>

<script>
  import SideMenuContainerDetail from "components/SideMenuContainerDetail";
  import SideMenuFullness from "components/SideMenuFullness";
  import SideMenuFilters from "components/SideMenuFilters";


  export default {
    name: "BottomMenuDesktop",

    data() {
      return {
        tab: "percentages"
      }
    },

    components: {
      SideMenuFilters,
      SideMenuFullness,
      SideMenuContainerDetail
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

  .q-item.q-item-type {
    border-bottom: #d5d4d4 1px solid;
  }
</style>
