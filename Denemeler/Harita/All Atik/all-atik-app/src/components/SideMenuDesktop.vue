<template>
  <div class="full-width">

    <!--Toolbar-->
    <SideMenuToolbar/>

    <!--Menu-->
    <q-card class="bg-blue-grey-1">
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
        <q-card style="width: 100%;">
          <q-card-section>
            <!--Adres-->
            <div class="text-h6 text-weight-bold">Adres</div>

            <!--Mahalle-->
            <q-select
              @input="selectNeighborhood"
              @clear="clearNeighborhood"
              v-model="selectedNeighborhood"
              :options="neighborhoods"
              label="Mahalle"
              class="q-mb-xs"
              :disable="selectedZone !== null"
              option-label="name"
              bg-color="blue-1"
              filled
              dense
              clearable
            />

            <!--Sokak-->
            <q-select
              @input="selectStreet"
              @clear="clearStreet"
              v-model="selectedStreet"
              :options="streets"
              label="Sokak"
              class="q-mb-xs q-mb-sm"
              :disable="!selectedNeighborhood"
              option-label="name"
              bg-color="blue-1"
              filled
              dense
              clearable
            />

            <!--Bölge-->
            <div class="text-h6 text-weight-bold">Bölge</div>

            <!--Bölge-->
            <q-select
              @input="selectZone"
              @clear="clearZone"
              v-model="selectedZone"
              :options="zones"
              label="Bölge"
              option-label="name"
              class="q-mb-xs q-mb-sm"
              :disable="selectedNeighborhood !== null"
              bg-color="blue-1"
              filled
              dense
              clearable
            />

            <!--Konteyner-->
            <div class="text-h6 text-weight-bold">Konteyner</div>

            <!--Konteyner tipi-->
            <q-select
              @input="selectContainerType"
              @clear="clearContainerType"
              v-model="selectedContainerType"
              :options="containerTypes"
              label="Konteyner Tipi"
              option-label="name"
              class="q-mb-xs q-mb-sm"
              bg-color="blue-1"
              filled
              dense
              clearable
            />

            <!--Doluluk-->
            <q-select
              @input="changeFullness"
              @clear="clearFullness"
              v-model="selectedFullness"
              :options="fullness"
              label="Doluluk"
              option-label="name"
              bg-color="blue-1"
              filled
              dense
              clearable
            />
          </q-card-section>

        </q-card>
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
  import {
    apiGetContainerTypes,
    apiGetNeighborhoods,
    apiGetStreets,
    apiGetZones
  } from "src/api";
  import SideMenuToolbar from "components/SideMenuToolbar";
  import SideMenuContainerDetail from "components/SideMenuContainerDetail";
  import SideMenuFullness from "components/SideMenuFullness";


  export default {
    name: "SideMenuDesktop",

    components: {
      SideMenuFullness,
      SideMenuContainerDetail,
      SideMenuToolbar
    },

    data() {
      return {
        neighborhoods: [],
        selectedNeighborhood: null,
        streets: [],
        selectedStreet: null,
        zones: [],
        selectedZone: null,
        containerTypes: [],
        selectedContainerType: null,
        selectedFullness: null,
        fullness: [
          {name: "% 0-50", value: "0-50"},
          {name: "% 50-75", value: "50-75"},
          {name: "% 75-100", value: "75-100"},
          {name: "Veri yok", value: "noValue"},
        ]
      }
    },

    methods: {
      populateNeighborhoods() {
        apiGetNeighborhoods()
          .then(response => {
            this.neighborhoods = [];
            this.neighborhoods = response.data;
          })
      },

      populateStreets() {
        apiGetStreets(this.selectedNeighborhood.id)
          .then(response => {
            this.streets = [];
            this.streets = response.data;
          })
      },

      populateZones() {
        apiGetZones()
          .then(response => {
            this.zones = [];
            this.zones = response.data;
          })
      },

      populateContainerTypes() {
        apiGetContainerTypes()
          .then(response => {
            this.containerTypes = [];
            this.containerTypes = response.data;
          })
      },

      selectNeighborhood() {
        if (this.selectedNeighborhood) {
          this.$store.dispatch(
            "updateQueryParameter",
            {
              query: "neighborhoodID",
              value: this.selectedNeighborhood.id
            }
          )

          this.selectedStreet = null;
          this.$store.dispatch("queryContainers");
          this.populateStreets();
        }
      },

      clearNeighborhood() {
        this.$store.dispatch(
          "updateQueryParameter",
          {
            query: "neighborhoodID",
            value: 0
          }
        )

        this.$store.dispatch("queryContainers");
      },

      selectStreet() {
        if (this.selectedStreet) {
          this.$store.dispatch(
            "updateQueryParameter",
            {
              query: "streetID",
              value: this.selectedStreet.id
            }
          )

          this.$store.dispatch("queryContainers");
        }
      },

      clearStreet() {
        this.$store.dispatch(
          "updateQueryParameter",
          {
            query: "streetID",
            value: 0
          }
        )

        this.$store.dispatch("queryContainers");
      },

      selectZone() {
        if (this.selectedZone) {
          this.$store.dispatch(
            "updateQueryParameter",
            {
              query: "zoneID",
              value: this.selectedZone.id
            }
          )

          this.selectedStreet = null;
          this.selectedNeighborhood = null;
          this.$store.dispatch("queryContainers");
        }
      },

      clearZone() {
        this.$store.dispatch(
          "updateQueryParameter",
          {
            query: "zoneID",
            value: 0
          }
        )

        this.$store.dispatch("queryContainers");
      },

      selectContainerType() {
        if (this.selectedContainerType) {
          this.$store.dispatch(
            "updateQueryParameter",
            {
              query: "typeID",
              value: this.selectedContainerType.id
            }
          )

          this.$store.dispatch("queryContainers");
        }
      },

      clearContainerType() {
        this.$store.dispatch(
          "updateQueryParameter",
          {
            query: "typeID",
            value: 0
          }
        )

        this.$store.dispatch("queryContainers");
      },

      clearFullness() {
        this.$store.dispatch(
          "updateQueryParameter",
          {
            query: "fullness",
            value: null
          }
        )

        this.$store.dispatch("queryContainers");
      },

      changeFullness() {
        this.$store.dispatch("setSelectedFullness", this.selectedFullness);
        this.$store.dispatch('selectFullness');
      }
    },

    mounted() {
      this.populateNeighborhoods();
      this.populateZones();
      this.populateContainerTypes();

      this.$store.dispatch("queryContainers");
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

</style>
