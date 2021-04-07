<template>
  <q-card style="width: 100%;">
    <q-card-section>
      <div class="row q-mb-xs details">

        <!--  Konteyner Detayları-->
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">ID:</div>
        </div>

        <div :class="valueWidth">
          <div class="q-mr-xs" v-if="getClickedContainer">
            {{selectedContainer.id}}
          </div>
        </div>
      </div>

      <div class="row q-mb-xs details">
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">Konteyner Adı:</div>
        </div>

        <div :class="valueWidth">
          <div v-if="getClickedContainer">
            {{selectedContainer.containerName}}
          </div>
        </div>
      </div>

      <div class="row q-mb-xs details">
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">Mahalle:</div>
        </div>

        <div :class="valueWidth">
          <div class="q-mr-xs" v-if="getClickedContainer">
            {{selectedContainer.neighborhoodName}}
          </div>
        </div>
      </div>

      <div class="row q-mb-xs details">
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">Sokak:</div>
        </div>

        <div :class="valueWidth">
          <div v-if="getClickedContainer">
            {{selectedContainer.streetName}}
          </div>
        </div>
      </div>

      <div class="row q-mb-xs details">
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">Bölge:</div>
        </div>

        <div :class="valueWidth">
          <div class="q-mr-xs" v-if="getClickedContainer">
            {{selectedContainer.zoneName}}
          </div>
        </div>
      </div>

      <div class="row q-mb-xs details">
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">Tipi:</div>
        </div>

        <div :class="valueWidth">
          <div v-if="getClickedContainer">
            {{selectedContainer.typeName}}
          </div>
        </div>
      </div>

      <div class="row q-mb-xs details">
        <div class="col-6">
          <div :class="aliasWidth">
            <div :class="[textSize, 'text-weight-bold']">Doluluk:</div>
          </div>

          <q-circular-progress
            v-if="getClickedContainer"
            :show-value="selectedContainer.fullness !== null"
            font-size="12px"
            :value="selectedContainer.fullness ? selectedContainer.fullness : 0"
            size="50px"
            :thickness="0.22"
            :color="getFullness"
            track-color="grey-3"
            class="q-ma-md"
          >
            %{{selectedContainer.fullness ? selectedContainer.fullness : "Veri yok"}}
          </q-circular-progress>
        </div>

        <div class="col-6">
          <div :class="aliasWidth">
            <div :class="[textSize, 'text-weight-bold']">Pil:</div>
          </div>

          <q-circular-progress
            v-if="getClickedContainer"
            :show-value="selectedContainer.battery !== null"
            font-size="12px"
            :value="selectedContainer.battery ? selectedContainer.battery : 0"
            size="50px"
            :thickness="0.22"
            :color="getBattery"
            track-color="grey-3"
            class="q-ma-md"
          >
            %{{selectedContainer.battery ? selectedContainer.battery : "Veri yok"}}
          </q-circular-progress>

        </div>
      </div>

      <div class="row q-mb-xs details">
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">Yangın Riski:</div>
        </div>

        <div :class="valueWidth">
          <div v-if="getClickedContainer">
          <span :class="`text-${checkValue(selectedContainer.fireRisk)}`">
            {{selectedContainer.fireRisk !== null ? selectedContainer.fireRisk === true ? "Var" : "Yok" : "Veri yok"}}
          </span>
          </div>
        </div>
      </div>

      <div class="row q-mb-xs details">
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">Cihaz:</div>
        </div>

        <div :class="valueWidth">
          <div v-if="getClickedContainer">
            {{selectedContainer.typeName}}
          </div>
        </div>
      </div>

      <div class="row q-mb-xs details">
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">Son Güncelleme:</div>
        </div>

        <div :class="valueWidth">
          <div v-if="getClickedContainer">
          <span :class="`text-${checkValue(selectedContainer.lastUpdate)}`">
            {{selectedContainer.lastUpdate | formatDate}}
          </span>
          </div>
        </div>
      </div>

      <div class="row q-mb-xs details">
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">Son Toplama:</div>
        </div>

        <div :class="valueWidth">
          <div v-if="getClickedContainer">
            <span :class="`text-${checkValue(selectedContainer.lastCollection)}`">
              {{selectedContainer.lastCollection | formatDate}}
            </span>
          </div>
        </div>
      </div>

    </q-card-section>
  </q-card>
</template>

<script>
  import {format} from "date-fns";
  import {mapGetters} from "vuex";


  export default {
    name: "SideMenuContainerDetail",

    data() {
      return {
        aliasWidth: "col-5",
        valueWidth: "col-7"
      }
    },

    computed: {
      ...mapGetters([
        "getClickedContainer"
      ]),

      textSize() {
        if (this.$store.getters.getPageSize === "xs") {
          return "text-h8"
        } else {
          return "text-h8"
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
          if (value === true) {
            return "red";
          }
          return "black";
        }  else {
          return "grey";
        }
      },
    },

    filters: {
      formatDate(value) {
        if (value) {
          return format(value, "dd.MM.yyyy - HH:mm")
        } else {
          return "Veri yok";
        }
      },
    },
  }
</script>

<style scoped>
  .details {
    border-bottom: 1px solid #e5e3e3;
    padding-bottom: 3px;
  }
</style>
