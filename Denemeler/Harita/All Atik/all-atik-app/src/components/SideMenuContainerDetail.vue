<template>
  <q-card style="width: 100%;">
    <q-card-section>
      <div class="row q-mb-md">
        <div class="col-6">
          <div :class="[textSize, 'text-weight-bold']">ID</div>
          <div class="q-mr-xs" v-if="$store.getters.getClickedContainer">
            {{selectedContainer.id}}
          </div>
        </div>

        <div class="col-6">
          <div :class="[textSize, 'text-weight-bold']">Konteyner Adı</div>
          <div v-if="$store.getters.getClickedContainer">
            {{selectedContainer.containerName}}
          </div>
        </div>
      </div>

      <div class="row q-mb-md">
        <div class="col-6">
          <div :class="[textSize, 'text-weight-bold']">Mahalle</div>
          <div class="q-mr-xs" v-if="$store.getters.getClickedContainer">
            {{selectedContainer.neighborhoodName}}
          </div>
        </div>

        <div class="col-6">
          <div :class="[textSize, 'text-weight-bold']">Sokak</div>
          <div v-if="$store.getters.getClickedContainer">
            {{selectedContainer.streetName}}
          </div>
        </div>
      </div>

      <div class="row q-mb-md">
        <div class="col-6">
          <div :class="[textSize, 'text-weight-bold']">Bölge</div>
          <div class="q-mr-xs" v-if="$store.getters.getClickedContainer">
            {{selectedContainer.zoneName}}
          </div>
        </div>

        <div class="col-6">
          <div :class="[textSize, 'text-weight-bold']">Tipi</div>
          <div v-if="$store.getters.getClickedContainer">
            {{selectedContainer.typeName}}
          </div>
        </div>
      </div>

      <div class="row q-mb-md">
        <div class="col-6">
          <div :class="[textSize, 'text-weight-bold']">Doluluk</div>
          <div v-if="$store.getters.getClickedContainer">
              <span :class="`text-${getFullness}`">
                {{selectedContainer.fullness ? `% ${selectedContainer.fullness}` : "Veri yok"}}
              </span>
          </div>
        </div>

        <div class="col-6">
          <div :class="[textSize, 'text-weight-bold']">Pil</div>
          <div v-if="$store.getters.getClickedContainer">
              <span :class="`text-${getBattery}`">
                {{selectedContainer.battery ? `% ${selectedContainer.battery}` : "Veri yok"}}
              </span>
          </div>
        </div>
      </div>

      <div class="row q-mb-md">
        <div class="col-6">
          <div :class="[textSize, 'text-weight-bold']">Yangın Riski</div>
          <div v-if="$store.getters.getClickedContainer">
              <span :class="`text-${checkValue(selectedContainer.fireRisk)}`">
                {{selectedContainer.fireRisk !== null ? selectedContainer.fireRisk === true ? "Var" : "Yok" : "Veri yok"}}
              </span>
          </div>
        </div>

        <div class="col-6">
          <div :class="[textSize, 'text-weight-bold']">Cihaz</div>
          <div v-if="$store.getters.getClickedContainer">
              <span :class="`text-${checkValue(selectedContainer.device)}`">
                {{selectedContainer.device ? selectedContainer.device : "Veri yok"}}
              </span>
          </div>
        </div>
      </div>

      <div class="row q-mb-md">
        <div class="col-6">
          <div :class="[textSize, 'text-weight-bold']">Son Toplama</div>
          <div v-if="$store.getters.getClickedContainer">
              <span :class="`text-${checkValue(selectedContainer.lastCollection)}`">
                {{selectedContainer.lastCollection | formatDate}}
              </span>
          </div>
        </div>

        <div class="col-6">
          <div :class="[textSize, 'text-weight-bold']">Son Güncelleme</div>
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
</template>

<script>
  import {format} from "date-fns";


  export default {
    name: "SideMenuContainerDetail",

    computed: {
      textSize() {
        if (this.$store.getters.getPageSize === "xs") {
          return "text-h8"
        } else {
          return "text-h6"
        }
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
      checkValue(value) {
        if (value !== null) {
          return "black"
        } else {
          return "grey"
        }
      },

      updateGeometry() {
        this.$store.dispatch("updatingGeometry");
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
  }
</script>

<style scoped>

</style>
