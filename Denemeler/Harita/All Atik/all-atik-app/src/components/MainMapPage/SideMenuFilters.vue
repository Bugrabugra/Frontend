<template>
  <q-card style="width: 100%;">
    <q-card-section>
      <!--Adres-->
      <div class="text-h7 text-weight-bold">{{$t("pageMainMap.expansionItems.filters.lblAddress")}}</div>

      <!--Mahalle-->
      <q-select
        @input="selectNeighborhood"
        @clear="clearNeighborhood"
        v-model="selectedNeighborhood"
        :options="neighborhoods"
        :label="$t('pageMainMap.expansionItems.filters.phNeighborhood')"
        class="q-mb-xs"
        :disable="selectedZone !== null"
        option-label="name"
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
        :label="$t('pageMainMap.expansionItems.filters.phStreet')"
        class="q-mb-xs q-mb-sm"
        :disable="!selectedNeighborhood"
        option-label="name"
        filled
        dense
        clearable
      />

      <!--Bölge-->
      <div class="text-h7 text-weight-bold">{{$t('pageMainMap.expansionItems.filters.lblZone')}}</div>

      <!--Bölge-->
      <q-select
        @input="selectZone"
        @clear="clearZone"
        v-model="selectedZone"
        :options="zones"
        :label="$t('pageMainMap.expansionItems.filters.phZone')"
        option-label="name"
        class="q-mb-xs q-mb-sm"
        :disable="selectedNeighborhood !== null"
        filled
        dense
        clearable
      />

      <!--Konteyner-->
      <div class="text-h7 text-weight-bold">{{$t('pageMainMap.expansionItems.filters.lblContainer')}}</div>

      <!--Konteyner tipi-->
      <q-select
        @input="selectContainerType"
        @clear="clearContainerType"
        v-model="selectedContainerType"
        :options="containerTypes"
        :label="$t('pageMainMap.expansionItems.filters.phContainerType')"
        option-label="name"
        class="q-mb-xs q-mb-sm"
        filled
        dense
        clearable
      />

      <!--Doluluk-->
      <q-select
        @input="selectFullness"
        @clear="clearFullness"
        v-model="selectedFullness"
        :options="fullness"
        :label="$t('pageMainMap.expansionItems.filters.phFullness')"
        option-label="name"
        class="q-mb-xs q-mb-sm"
        filled
        dense
        clearable
      />

      <!--Yangın riski-->
      <q-select
        @input="selectFireRisk"
        @clear="clearFireRisk"
        v-model="selectedFireRisk"
        :options="fireRisk"
        :label="$t('pageMainMap.expansionItems.filters.phFireRisk')"
        option-label="name"
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
  import {i18n} from "boot/i18n";


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
          {name: this.$t('pageMainMap.expansionItems.containerDetail.lblNoValue'), value: "noValue"},
        ],
        selectedFireRisk: null,
        fireRisk: [
          {name: this.$t('pageMainMap.expansionItems.containerDetail.lblThere'), value: "yes"},
          {name: this.$t('pageMainMap.expansionItems.containerDetail.lblThereIsNot'), value: "no"}
        ]
      }
    },

    computed: {
      ...mapGetters({
        storeSelectedFullness: "getSelectedFullness",
        storeSelectedFireRisk: "getSelectedFireRisk",
        getSettings: "getSettings"
      })
    },

    methods: {
      populateNeighborhoods() {
        apiGetNeighborhoods(this.getSettings.jwt)
          .then(response => {
            this.neighborhoods = [];
            this.neighborhoods = response.data;
          })
      },

      populateStreets() {
        apiGetStreets(this.selectedNeighborhood.id, this.getSettings.jwt)
          .then(response => {
            this.streets = [];
            this.streets = response.data;
          })
      },

      populateZones() {
        apiGetZones(this.getSettings.jwt)
          .then(response => {
            this.zones = [];
            this.zones = response.data;
          })
      },

      populateContainerTypes() {
        apiGetContainerTypes(this.getSettings.jwt)
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

          this.$store.dispatch(
            "selectZoneGeometry",
            this.selectedZone.id
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
        );

        this.$store.dispatch("clearZones");
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

      selectFullness() {
        this.$store.dispatch("setSelectedFullness", this.selectedFullness);
        this.$store.dispatch('selectFullness');
      },

      selectFireRisk() {
        if (this.selectedFireRisk) {
          this.$store.dispatch(
            "updateQueryParameter",
            {
              query: "fireRisk",
              value: this.selectedFireRisk.value
            }
          )

          this.$store.dispatch("queryContainers");
        }
      },

      clearFireRisk() {
        this.$store.dispatch(
          "updateQueryParameter",
          {
            query: "fireRisk",
            value: null
          }
        )

        this.$store.dispatch("queryContainers");
      }
    },

    watch: {
      storeSelectedFullness() {
        this.selectedFullness = this.$store.getters.getSelectedFullness;
      },

      storeSelectedFireRisk() {
        if (this.$store.getters.getSelectedFireRisk === "yes") {
          this.selectedFireRisk = "Var";
        } else if (this.$store.getters.getSelectedFireRisk === "no")
          this.selectedFireRisk = "Yok";
        else {
          this.selectedFireRisk = null;
        }
      }
    },

    mounted() {
      this.populateNeighborhoods();
      this.populateZones();
      this.populateContainerTypes();
    }
  }
</script>
