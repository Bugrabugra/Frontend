<template>
  <div class="full-width" style="max-width: 350px;">

      <!--Toolbar-->
      <q-toolbar class="text-primary bg-grey-8 text-white">
        <q-toolbar-title>
          Konteyner Adet: <span v-if="$store.getters.getContainers">{{containersCount}}</span>
        </q-toolbar-title>

        <q-btn flat round dense icon="menu" @click="toggleSideMenu" />
        <!--TODO butona basınca kapansın-->
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
            <q-card-section class="q-pb-none">
              <div class="text-h7 text-weight-bold">Doluluk Oranı</div>
            </q-card-section>

            <q-card-section>
              <div class="row q-mb-sm">
                <div class="col-6">
              <span>
                <q-icon style="color: #6AA454" size="md" name="delete"/>
                % 0-50 : <strong>{{countGreen}}</strong>
              </span>
                </div>

                <div class="col-6">
              <span>
                <q-icon style="color: #ef4343" size="md" name="delete"/>
                % 75-100 : <strong>{{countRed}}</strong>
              </span>
                </div>

              </div>

              <div class="row">
                <div class="col-6">
              <span>
                <q-icon style="color: #fdc740" size="md" name="delete"/>
                % 50-75 : <strong>{{countYellow}}</strong>
              </span>
                </div>

                <div class="col-6">
              <span>
                <q-icon color="grey" size="md" name="delete"/>
                Veri Yok : <strong>{{countGrey}}</strong>
              </span>
                </div>
              </div>
            </q-card-section>

          </q-card>
        </q-expansion-item>

        <!--Filtreler-->
        <q-expansion-item
          group="group"
          icon="search"
          label="Filtre"
          expand-separator
          default-opened
        >
          <q-card style="width: 100%;">
            <q-card-section>
              <!--Adres-->
              <div class="text-h7 text-weight-bold">Adres</div>

              <!--Mahalle-->
              <q-select
                @input="selectNeighborhood"
                @clear="clearNeighborhood"
                v-model="selectedNeighborhood"
                :options="neighborhoods"
                label="Mahalle"
                class="q-mb-xs"
                :disable="selectedRegion !== null"
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
              <div class="text-h7 text-weight-bold">Bölge</div>

              <!--Bölge-->
              <q-select
                v-model="selectedRegion"
                :options="regions"
                label="Bölge"
                class="q-mb-xs q-mb-sm"
                :disable="selectedNeighborhood !== null"
                filled
                dense
                clearable
              />

              <!--Konteyner-->
              <div class="text-h7 text-weight-bold">Konteyner</div>

              <!--Konteyner tipi-->
              <q-select
                v-model="selectedContainerType"
                :options="containerType"
                label="Konteyner Tipi"
                class="q-mb-xs q-mb-sm"
                filled
                dense
                clearable
              />

              <!--Doluluk-->
              <q-select
                v-model="selectedFullness"
                :options="fullness"
                label="Doluluk"
                filled
                dense
                clearable
              />
            </q-card-section>

          </q-card>
        </q-expansion-item>

        <!--Konteyner detay-->
        <q-expansion-item
          group="group"
          expand-separator
          icon="info"
          label="Konteyner Detay"
        >
          <q-card style="width: 100%;">
            <!--Başlık-->
            <q-card-section class="q-pb-none">
              <div class="text-h7 text-weight-bold">Konteyner Detay</div>
            </q-card-section>

            <q-card-section>
              <div class="row q-mb-md">
                <div class="col-6">
                  <div class="text-weight-bold">ID</div>
                  <div v-if="$store.getters.getContainer">
                    {{selectedContainer.id}}
                  </div>
                </div>

                <div class="col-6">
                  <div class="text-weight-bold">Konteyner Adı</div>
                  <div v-if="$store.getters.getContainer">
                    {{selectedContainer.containerName}}
                  </div>
                </div>
              </div>

              <div class="row q-mb-md">
                <div class="col-6">
                  <div class="text-weight-bold">Mahalle</div>
                  <div v-if="$store.getters.getContainer">
                    {{selectedContainer.neighborhoodName}}
                  </div>
                </div>

                <div class="col-6">
                  <div class="text-weight-bold">Sokak</div>
                  <div v-if="$store.getters.getContainer">
                    {{selectedContainer.streetName}}
                  </div>
                </div>
              </div>

              <div class="row q-mb-md">
                <div class="col-6">
                  <div class="text-weight-bold">Bölge</div>
                  <div v-if="$store.getters.getContainer">
                    {{selectedContainer.zoneName}}
                  </div>
                </div>

                <div class="col-6">
                  <div class="text-weight-bold">Tipi</div>
                  <div v-if="$store.getters.getContainer">
                    {{selectedContainer.typeName}}
                  </div>
                </div>
              </div>

              <div class="row q-mb-md">
                <div class="col-6">
                  <div class="text-weight-bold">Doluluk</div>
                  <div v-if="$store.getters.getContainer">
                <span :class="`text-${getFullness}`">
                  {{selectedContainer.fullness ? `% ${selectedContainer.fullness}` : "Veri yok"}}
                </span>
                  </div>
                </div>

                <div class="col-6">
                  <div class="text-weight-bold">Pil</div>
                  <div v-if="$store.getters.getContainer">
                <span :class="`text-${getBattery}`">
                  {{selectedContainer.battery ? `% ${selectedContainer.battery}` : "Veri yok"}}
                </span>
                  </div>
                </div>
              </div>

              <div class="row q-mb-md">
                <div class="col-6">
                  <div class="text-weight-bold">Yangın Riski</div>
                  <div v-if="$store.getters.getContainer">
                <span :class="`text-${checkValue(selectedContainer.fireRisk)}`">
                  {{selectedContainer.fireRisk !== null ? selectedContainer.fireRisk === true ? "Var" : "Yok" : "Veri yok"}}
                </span>
                  </div>
                </div>

                <div class="col-6">
                  <div class="text-weight-bold">Cihaz</div>
                  <div v-if="$store.getters.getContainer">
                <span :class="`text-${checkValue(selectedContainer.device)}`">
                  {{selectedContainer.device ? selectedContainer.device : "Veri yok"}}
                </span>
                  </div>
                </div>
              </div>

              <div class="row q-mb-md">
                <div class="col-6">
                  <div class="text-weight-bold">Son Toplama</div>
                  <div v-if="$store.getters.getContainer">
                <span :class="`text-${checkValue(selectedContainer.lastCollection)}`">
                  {{selectedContainer.lastCollection | formatDate}}
                </span>
                  </div>
                </div>

                <div class="col-6">
                  <div class="text-weight-bold">Son Güncelleme</div>
                  <div v-if="$store.getters.getContainer">
                <span :class="`text-${checkValue(selectedContainer.lastUpdate)}`">
                  {{selectedContainer.lastUpdate | formatDate}}
                </span>
                  </div>
                </div>
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
        sideMenu: true,
        neighborhoods: [],
        selectedNeighborhood: null,
        streets: [],
        selectedStreet: null,
        regions: [],
        selectedRegion: null,
        containerType: ["Metal", "Galvaniz"],
        selectedContainerType: null,
        selectedFullness: null,
        fullness: ["% 0-50", "% 50-75", "% 75-100", "Veri yok"],
        countGreen: 0,
        countYellow: 0,
        countRed: 0,
        countGrey: 0
      }
    },

    computed: {
      containersCount() {
        return this.$store.getters.getContainers.length
      },

      selectedContainer() {
        return this.$store.getters.getContainer
      },

      getFullness() {
        const fullness = this.selectedContainer.fullness;

        if (fullness === null) {
          return "grey"
        } else if (fullness >= 0 && fullness <= 50) {
          return "green"
        } else if (fullness > 50 && fullness <= 75) {
          return "orange"
        } else if (fullness > 75 && fullness <= 100) {
          return "red"
        }
      },

      getBattery() {
        const battery = this.selectedContainer.battery;

        if (battery === null) {
          return "grey"
        } else if (battery >= 0 && battery <= 50) {
          return "red"
        } else if (battery > 50 && battery <= 75) {
          return "orange"
        } else if (battery > 75 && battery <= 100) {
          return "green"
        }
      },

      containersFilled() {
        return this.$store.getters.getContainers;
      }
    },

    methods: {
      checkValue(value) {
        if (value !== null) {
          return "black"
        } else {
          return "grey"
        }
      },

      toggleSideMenu() {
        this.sideMenu = !this.sideMenu;
      },

      populateFullness() {
        this.$store.getters.getContainers.forEach(container => {
          if (container.fullness === null) {
            this.countGrey++;
          } else if (container.fullness >= 0 && container.fullness <= 50) {
            this.countGreen++;
          } else if (container.fullness > 50 && container.fullness <= 75) {
            this.countYellow++;
          } else if (container.fullness > 75 && container.fullness <= 100) {
            this.countRed++;
          }
        })
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


      selectNeighborhood() {
        if (this.selectedNeighborhood) {
          this.selectedStreet = "";
          api.get(`/containers?neighborhoodID=${this.selectedNeighborhood.id}`)
            .then(response => {
              this.$store.dispatch("setContainers", response.data)
                .then(() => {
                  this.clearFullness();
                  this.populateFullness();
                  this.$store.dispatch("changeFilter", true);
                });
            })

          this.populateStreets();
        }
      },

      clearNeighborhood() {
        this.$store.dispatch("getContainers")
          .then(() => {
            this.$store.dispatch("startDrawingContainers", true);
          })
      },

      selectStreet() {
        if (this.selectedStreet) {
          api.get(`/containers?neighborhoodID=${this.selectedNeighborhood.id}&streetID=${this.selectedStreet.id}`)
            .then(response => {
              this.$store.dispatch("setContainers", response.data)
                .then(() => {
                  this.clearFullness();
                  this.populateFullness();
                  this.$store.dispatch("changeFilter", true);
                });
            })
        }
      },

      clearStreet() {
        this.$store.dispatch("getContainers")
          .then(() => {
            this.$store.dispatch("startDrawingContainers", true);
          })
      },

      clearFullness() {
        this.countGreen = 0;
        this.countYellow = 0;
        this.countRed = 0;
        this.countGrey = 0;
      }

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

    watch: {
      containersFilled() {
        this.populateFullness();
      }
    },

    mounted() {
      this.populateNeighborhoods();
    }
  }
</script>

<style lang="sass" scoped>
  .expansion-icon
    color: red
</style>
