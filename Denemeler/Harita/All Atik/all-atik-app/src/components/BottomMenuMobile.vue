<template>
  <div class="full-width">
    <div class="justify-center">
      <q-card>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel v-if="percentagesIsOpen" name="percentages" class="q-ma-none q-pa-none">
            <SideMenuFullness/>
          </q-tab-panel>

          <q-tab-panel v-if="filterIsOpen" name="filter" class="q-ma-none q-pa-none">
            <SideMenuFilters/>
          </q-tab-panel>

          <q-tab-panel v-if="infoIsOpen" name="info" class="q-ma-none q-pa-none">
            <SideMenuContainerDetail/>
          </q-tab-panel>
        </q-tab-panels>

        <q-separator/>

        <q-tabs
          v-model="tab"
          class="bg-grey-3"
          align="justify"
          narrow-indicator
          active-color="blue-14"
          dense
        >
          <q-tab icon="poll" name="percentages" label="DOLULUK" @click="openPercentages"/>
          <q-tab icon="filter_alt" name="filter" label="FİLTRELER" @click="openFilter"/>
          <q-tab icon="info" name="info" label="DETAY" @click="openInfo"/>
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

    components: {
      SideMenuFilters,
      SideMenuFullness,
      SideMenuContainerDetail
    },

    data() {
      return {
        tab: "percentages",
        percentagesIsOpen: true,
        filterIsOpen: true,
        infoIsOpen: true
      }
    },

    computed: {
      containerSelected() {
        return this.$store.getters.getClickedContainer;
      }
    },

    methods: {
      openPercentages() {
        if (this.tab === "percentages") {
          this.percentagesIsOpen = !this.percentagesIsOpen;
        }
      },

      openFilter() {
        if (this.tab === "filter") {
          this.filterIsOpen = !this.filterIsOpen;
        }
      },

      openInfo() {
        if (this.tab === "info") {
          this.infoIsOpen = !this.infoIsOpen;
        }
      }
    },

    watch: {
      tab() {
        this.percentagesIsOpen = true;
        this.filterIsOpen = true;
        this.infoIsOpen = true;
      },

      containerSelected() {
        this.tab = "info";
        this.infoIsOpen = true;
      }
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

  .q-item.q-item-type {
    border-bottom: #d5d4d4 1px solid;
  }

  .material-icons.q-icon.notranslate {
    color: #6d7171;
  }
</style>
