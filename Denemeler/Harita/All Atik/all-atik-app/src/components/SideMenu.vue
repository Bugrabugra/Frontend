<template>
  <div class="full-width">

      <!--Toolbar-->
      <q-toolbar class="text-primary bg-grey-8 text-white">
        <q-toolbar-title>
          Konteyner Adet: <span v-if="$store.getters.getContainers">{{containersCount}}</span>
        </q-toolbar-title>

        <q-icon
          name="zoom_out_map"
          size="md"
          style="cursor:pointer;"
          @click="resetView"
        />
      </q-toolbar>

      <!--Menu-->
      <q-card>
        <!--Doluluk oranı-->
        <q-expansion-item
          icon="poll"
          label="Doluluk Oranları"
          expand-separator
          default-opened
        >
          <q-card style="width: 100%;">
            <!--Başlık-->
            <!--<q-card-section class="q-pb-none">-->
            <!--  <div class="text-h7 text-weight-bold">Doluluk Oranı</div>-->
            <!--</q-card-section>-->

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

            <div class="row justify-center">
              <q-btn @click="$store.dispatch('createRoute', true)" glossy class="q-ma-sm block" color="blue-6">Rota oluştur</q-btn>
            </div>


          </q-card>
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
                :options="containerType"
                label="Konteyner Tipi"
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
                label="Doluluk"
                option-label="name"
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
          <q-card style="width: 100%;">
            <!--Başlık-->
            <!--<q-card-section class="q-pb-none">-->
            <!--  <div class="text-h7 text-weight-bold">Konteyner Detay</div>-->
            <!--</q-card-section>-->

            <q-card-section>
              <div class="row q-mb-md">
                <div class="col-6">
                  <div class="text-h6 text-weight-bold">ID</div>
                  <div class="q-mr-xs" v-if="$store.getters.getClickedContainer">
                    {{selectedContainer.id}}
                  </div>
                </div>

                <div class="col-6">
                  <div class="text-h6 text-weight-bold">Konteyner Adı</div>
                  <div v-if="$store.getters.getClickedContainer">
                    {{selectedContainer.containerName}}
                  </div>
                </div>
              </div>

              <div class="row q-mb-md">
                <div class="col-6">
                  <div class="text-h6 text-weight-bold">Mahalle</div>
                  <div class="q-mr-xs" v-if="$store.getters.getClickedContainer">
                    {{selectedContainer.neighborhoodName}}
                  </div>
                </div>

                <div class="col-6">
                  <div class="text-h6 text-weight-bold">Sokak</div>
                  <div v-if="$store.getters.getClickedContainer">
                    {{selectedContainer.streetName}}
                  </div>
                </div>
              </div>

              <div class="row q-mb-md">
                <div class="col-6">
                  <div class="text-h6 text-weight-bold">Bölge</div>
                  <div class="q-mr-xs" v-if="$store.getters.getClickedContainer">
                    {{selectedContainer.zoneName}}
                  </div>
                </div>

                <div class="col-6">
                  <div class="text-h6 text-weight-bold">Tipi</div>
                  <div v-if="$store.getters.getClickedContainer">
                    {{selectedContainer.typeName}}
                  </div>
                </div>
              </div>

              <div class="row q-mb-md">
                <div class="col-6">
                  <div class="text-h6 text-weight-bold">Doluluk</div>
                  <div v-if="$store.getters.getClickedContainer">
                <span :class="`text-${getFullness}`">
                  {{selectedContainer.fullness ? `% ${selectedContainer.fullness}` : "Veri yok"}}
                </span>
                  </div>
                </div>

                <div class="col-6">
                  <div class="text-h6 text-weight-bold">Pil</div>
                  <div v-if="$store.getters.getClickedContainer">
                <span :class="`text-${getBattery}`">
                  {{selectedContainer.battery ? `% ${selectedContainer.battery}` : "Veri yok"}}
                </span>
                  </div>
                </div>
              </div>

              <div class="row q-mb-md">
                <div class="col-6">
                  <div class="text-h6 text-weight-bold">Yangın Riski</div>
                  <div v-if="$store.getters.getClickedContainer">
                <span :class="`text-${checkValue(selectedContainer.fireRisk)}`">
                  {{selectedContainer.fireRisk !== null ? selectedContainer.fireRisk === true ? "Var" : "Yok" : "Veri yok"}}
                </span>
                  </div>
                </div>

                <div class="col-6">
                  <div class="text-h6 text-weight-bold">Cihaz</div>
                  <div v-if="$store.getters.getClickedContainer">
                <span :class="`text-${checkValue(selectedContainer.device)}`">
                  {{selectedContainer.device ? selectedContainer.device : "Veri yok"}}
                </span>
                  </div>
                </div>
              </div>

              <div class="row q-mb-md">
                <div class="col-6">
                  <div class="text-h6 text-weight-bold">Son Toplama</div>
                  <div v-if="$store.getters.getClickedContainer">
                <span :class="`text-${checkValue(selectedContainer.lastCollection)}`">
                  {{selectedContainer.lastCollection | formatDate}}
                </span>
                  </div>
                </div>

                <div class="col-6">
                  <div class="text-h6 text-weight-bold">Son Güncelleme</div>
                  <div v-if="$store.getters.getClickedContainer">
                <span :class="`text-${checkValue(selectedContainer.lastUpdate)}`">
                  {{selectedContainer.lastUpdate | formatDate}}
                </span>
                  </div>
                </div>
              </div>

              <div class="row justify-center">
                <q-btn
                  :disable="!this.$store.getters.getClickedContainer"
                  @click="updateGeometry"
                  :label="this.$store.getters.updatingGeometry ? 'Geometri Düzenleniyor' : 'Geometri Düzenle'"
                  :color="!this.$store.getters.getClickedContainer ? 'grey-5' : 'blue-6'"
                  :outline="this.$store.getters.updatingGeometry"
                />
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card>
  </div>
</template>

<script>
  import {format} from 'date-fns'
  import {api} from "boot/axios";


  export default {
    name: "SideMenu",

    data() {
      return {
        neighborhoods: [],
        selectedNeighborhood: null,
        streets: [],
        selectedStreet: null,
        zones: [],
        selectedZone: null,
        containerType: [
          {name: "Metal", value: 1},
          {name: "Galvaniz", value: 2}
        ],
        selectedContainerType: null,
        selectedFullness: null,
        fullness: [
          {name: "% 0-50", value: "0-50"},
          {name: "% 50-75", value: "50-75"},
          {name: "% 75-100", value: "75-100"},
          {name: "Veri yok", value: null},
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
        api.get(`/containers?${this.$store.getters.getQueryParameters}`)
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
        api.get("/neighborhoods")
          .then(response => {
            this.neighborhoods = [];
            this.neighborhoods = response.data;
          })
      },

      populateStreets() {
        api.get(`/streets?neighborhoodID=${this.selectedNeighborhood.id}`)
          .then(response => {
            this.streets = [];
            this.streets = response.data;
          })
      },

      populateZones() {
        api.get(`/zones`)
          .then(response => {
            this.zones = [];
            this.zones = response.data;
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
          this.updateFilter("typeID", this.selectedContainerType.value)
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
      this.queryContainers();
    }
  }
</script>

<style lang="sass">
  .q-item__section--avatar
      min-width: 0

  .q-item__section--side
    padding-right: 5px
</style>
