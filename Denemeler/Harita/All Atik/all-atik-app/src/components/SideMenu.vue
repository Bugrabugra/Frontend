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
                % 0-50 : <strong>87</strong>
              </span>
              </div>

              <div class="col-6">
              <span>
                <q-icon style="color: #ef4343" size="md" name="delete"/>
                % 75-100 : <strong>12</strong>
              </span>
              </div>

            </div>

            <div class="row">
              <div class="col-6">
              <span>
                <q-icon style="color: #fdc740" size="md" name="delete"/>
                % 50-75 : <strong>43</strong>
              </span>
              </div>

              <div class="col-6">
              <span>
                <q-icon color="grey" size="md" name="delete"/>
                Veri Yok : <strong>0</strong>
              </span>
              </div>
            </div>
          </q-card-section>

        </q-card>

        <!--Filtreler-->
        <q-card style="width: 100%;">
          <!--Başlık-->
          <!--<q-card-section class="q-pb-none">-->
          <!--  <div class="text-h7 text-weight-bold">Filtre</div>-->
          <!--</q-card-section>-->

          <q-card-section>
            <!--Adres-->
            <div class="text-h7 text-weight-bold">Adres</div>

            <!--Mahalle-->
            <q-select
              v-model="selectedNeighborhood"
              :options="neighborhood"
              label="Mahalle"
              class="q-mb-xs"
              :disable="selectedRegion !== null"
              filled
              dense
              clearable
            />

            <!--Sokak-->
            <q-select
              v-model="selectedStreet"
              :options="street"
              label="Sokak"
              class="q-mb-xs q-mb-sm"
              :disable="!selectedNeighborhood"
              filled
              dense
              clearable
            />

            <!--Bölge-->
            <div class="text-h7 text-weight-bold">Bölge</div>

            <!--Bölge-->
            <q-select
              v-model="selectedRegion"
              :options="region"
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

        <!--Konteyner detay-->
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
                <div class="text-weight-bold">Konteyner</div>
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
      </q-card>

  </div>
</template>

<script>
  import {format} from 'date-fns'


  export default {
    name: "SideMenu",

    data() {
      return {
        sideMenu: true,
        neighborhood: ["Atatürk", "Cumhuriyet"],
        selectedNeighborhood: null,
        street: ["Erzincan", "Bilgi"],
        selectedStreet: null,
        region: ["1. Bölge", "2. Bölge"],
        selectedRegion: null,
        containerType: ["Metal", "Galvaniz"],
        selectedContainerType: null,
        selectedFullness: null,
        fullness: ["0-50", "50-75", "75-100", "Veri yok"]
      }
    },

    computed: {
      containersCount() {
        return this.$store.getters.getContainers.length
      },

      selectedContainer() {
        return this.$store.getters.getContainer
      },

      filteredContainers() {
        return this.$store.getters.getContainers.filter(container => {

        })
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
    }
  }
</script>

<style scoped>

</style>
