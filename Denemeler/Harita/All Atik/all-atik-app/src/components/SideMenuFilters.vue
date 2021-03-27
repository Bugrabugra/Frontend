<template>
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
</template>

<script>
  import {apiGetContainerTypes, apiGetNeighborhoods, apiGetStreets, apiGetZones} from "src/api";
  import {mapGetters} from "vuex";


  export default {
    name: "SideMenuFilters",

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

    computed: {
      ...mapGetters({
        storeSelectedFullness: "getSelectedFullness"
      })
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
            value: ""
          }
        )

        this.$store.dispatch("queryContainers");
      },

      changeFullness() {
        this.$store.dispatch("setSelectedFullness", this.selectedFullness);
        this.$store.dispatch('selectFullness');
      }
    },

    watch: {
      storeSelectedFullness() {
        this.selectedFullness = this.$store.getters.getSelectedFullness;
      }
    },

    mounted() {
      this.populateNeighborhoods();
      this.populateZones();
      this.populateContainerTypes();

      // this.$store.dispatch("queryContainers");
    }
  }
</script>
