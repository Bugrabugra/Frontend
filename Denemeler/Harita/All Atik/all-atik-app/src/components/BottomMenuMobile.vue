<template>
  <div class="full-width">
    <div class="justify-center">
      <q-card>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="percentages" class="q-ma-none q-pa-none">
            <q-card style="width: 100%;">
              <!--Başlık-->
              <q-card-section>
                <div class="row q-mb-sm">
                  <div class="col-6">
                  <span>
                    <q-icon @click="handleIconFullness($event)" class="green" style="color: #6AA454; cursor:pointer;" size="md" name="delete"/>
                    % 0-50 : <strong>{{countGreen}}</strong>
                  </span>
                  </div>

                  <div class="col-6">
                  <span>
                    <q-icon @click="handleIconFullness($event)" class="red" style="color: #ef4343; cursor:pointer;" size="md" name="delete"/>
                    % 75-100 : <strong>{{countRed}}</strong>
                  </span>
                  </div>

                </div>

                <div class="row">
                  <div class="col-6">
                  <span>
                    <q-icon @click="handleIconFullness($event)" class="yellow" style="color: #fdc740; cursor:pointer;" size="md" name="delete"/>
                    % 50-75 : <strong>{{countYellow}}</strong>
                  </span>
                  </div>

                  <div class="col-6">
                  <span>
                    <q-icon @click="handleIconFullness($event)" class="grey" style="cursor:pointer;" color="grey" size="md" name="delete"/>
                    Veri Yok : <strong>{{countGrey}}</strong>
                  </span>
                  </div>
                </div>
              </q-card-section>

            </q-card>
          </q-tab-panel>

          <q-tab-panel name="filter" class="q-ma-none q-pa-none">
            <q-card class="full-width">
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
                  @input="selectFullness"
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
  import {format} from 'date-fns'
  import {
    apiGetContainerTypes,
    apiGetFilteredContainers,
    apiGetNeighborhoods,
    apiGetStreets,
    apiGetZones
  } from "src/api";
  import SideMenuContainerDetail from "components/SideMenuContainerDetail";


  export default {
    name: "BottomMenuDesktop",
    components: {SideMenuContainerDetail},
    data() {
      return {
        tab: "percentages",
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
        ],
        countGreen: 0,
        countYellow: 0,
        countRed: 0,
        countGrey: 0,
      }
    },

    computed: {
      containersCount() {
        return this.$store.getters.getContainers.length;
      },

      selectedContainer() {
        return this.$store.getters.getClickedContainer.container;
      },

      getFullness() {
        const fullness = this.selectedContainer.fullness;

        if (fullness === null) {
          return "grey"
        } else if (fullness >= 0 && fullness < 50) {
          return "green"
        } else if (fullness >= 50 && fullness < 75) {
          return "orange"
        } else if (fullness >= 75 && fullness <= 100) {
          return "red"
        }
      },

      getBattery() {
        const battery = this.selectedContainer.battery;

        if (battery === null) {
          return "grey"
        } else if (battery >= 0 && battery < 50) {
          return "red"
        } else if (battery >= 50 && battery < 75) {
          return "orange"
        } else if (battery >= 75 && battery <= 100) {
          return "green"
        }
      },
    },

    methods: {
      queryContainers() {
        apiGetFilteredContainers(this.$store.getters.getQueryParameters)
          .then(response => {
            const featuresWithGeometry = response.data.filter(container => {
              return container.latitude !== null && container.longitude !== null;
            });

            this.$store.dispatch("setContainers", featuresWithGeometry)
              .then(() => {
                this.populateFullness();
                this.$store.dispatch("changeFilter", true);
              });
          })
      },

      checkValue(value) {
        if (value !== null) {
          return "black"
        } else {
          return "grey"
        }
      },

      updateFilter(query, value) {
        this.$store.dispatch(
          "updateQueryParameter",
          {
            query: query,
            value: value
          }
        )
      },

      populateFullness() {
        this.clearFullnessValues();
        this.$store.getters.getContainers.forEach(container => {
          if (container.fullness === null) {
            this.countGrey++;
          } else if (container.fullness >= 0 && container.fullness < 50) {
            this.countGreen++;
          } else if (container.fullness >= 50 && container.fullness < 75) {
            this.countYellow++;
          } else if (container.fullness >= 75 && container.fullness <= 100) {
            this.countRed++;
          }
        })

        if (this.countRed) {
          this.$q.notify({
            type: 'negative',
            message: `Dolu durumda ${this.countRed} adet konteyner vardır!`,
            actions: [{ icon: 'close', color: 'white' }],
            icon: "local_shipping"
          })
        }
      },

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
          this.updateFilter("neighborhoodID", this.selectedNeighborhood.id)
          this.selectedStreet = null;
          this.queryContainers();
          this.populateStreets();
        }
      },

      clearNeighborhood() {
        this.updateFilter("neighborhoodID", 0)
        this.queryContainers();
      },

      selectStreet() {
        if (this.selectedStreet) {
          this.updateFilter("streetID", this.selectedStreet.id)
          this.queryContainers();
        }
      },

      clearStreet() {
        this.updateFilter("streetID", 0)
        this.queryContainers();
      },

      selectZone() {
        if (this.selectedZone) {
          this.updateFilter("zoneID", this.selectedZone.id)
          this.selectedStreet = null;
          this.selectedNeighborhood = null;
          this.queryContainers();
        }
      },

      clearZone() {
        this.updateFilter("zoneID", 0)
        this.queryContainers();
      },

      selectContainerType() {
        if (this.selectedContainerType) {
          this.updateFilter("typeID", this.selectedContainerType.id)
          this.queryContainers();
        }
      },

      clearContainerType() {
        this.updateFilter("typeID", 0)
        this.queryContainers();
      },

      handleIconFullness(event) {
        const classList = Array.from(event.target.classList);
        if (classList.includes("green")) {
          this.selectedFullness = {name: '% 0-50', value: '0-50'};
        } else if (classList.includes("yellow")) {
          this.selectedFullness = {name: '% 50-75', value: '50-75'};
        } else if (classList.includes("red")) {
          this.selectedFullness = {name: '% 75-100', value: '75-100'};
        } else {
          this.selectedFullness = {name: "Veri yok", value: null};
        }

        this.selectFullness();
      },

      selectFullness() {
        if (this.selectedFullness) {
          this.updateFilter("fullness", this.selectedFullness.value)
          this.queryContainers();
        }
      },

      clearFullness() {
        this.updateFilter("fullness", null)
        this.queryContainers();
      },

      clearFullnessValues() {
        this.countGreen = 0;
        this.countYellow = 0;
        this.countRed = 0;
        this.countGrey = 0;
      },

      updateGeometry() {
        this.$store.dispatch("updatingGeometry");
      },

      resetView() {
        this.$store.dispatch("resetView", true);
      },
    },

    filters: {
      formatDate(value) {
        if (value) {
          return format(value, "dd.MM.yyyy - HH:MM")
        } else {
          return "Veri yok";
        }
      },
    },

    mounted() {
      this.populateNeighborhoods();
      this.populateZones();
      this.populateContainerTypes();

      this.queryContainers();
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
