<template>
  <q-card style="width: 100%;" square>
    <q-card-section>
      <div class="row q-mb-xs details">

        <!--  Container details-->
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">{{$t('pageMainMap.expansionItems.containerDetail.lblID')}}</div>
        </div>

        <!--ID-->
        <div :class="valueWidth">
          <div class="q-mr-xs" v-if="getClickedContainer">
            {{selectedContainer.id}}
          </div>
        </div>
      </div>

      <!--Container name-->
      <div class="row q-mb-xs details">
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">{{$t('pageMainMap.expansionItems.containerDetail.lblContainerName')}}</div>
        </div>

        <div :class="valueWidth">
          <div v-if="getClickedContainer">
            {{selectedContainer.containerName}}
          </div>
        </div>
      </div>

      <!--Container neighborhood-->
      <div class="row q-mb-xs details">
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">{{$t('pageMainMap.expansionItems.containerDetail.lblNeighborhood')}}</div>
        </div>

        <div :class="valueWidth">
          <div class="q-mr-xs" v-if="getClickedContainer">
            {{selectedContainer.neighborhoodName}}
          </div>
        </div>
      </div>

      <!--Container street-->
      <div class="row q-mb-xs details">
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">{{$t('pageMainMap.expansionItems.containerDetail.lblStreet')}}</div>
        </div>

        <div :class="valueWidth">
          <div v-if="getClickedContainer">
            {{selectedContainer.streetName}}
          </div>
        </div>
      </div>

      <!--Container zone-->
      <div class="row q-mb-xs details">
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">{{$t('pageMainMap.expansionItems.containerDetail.lblZone')}}</div>
        </div>

        <div :class="valueWidth">
          <div class="q-mr-xs" v-if="getClickedContainer">
            {{selectedContainer.zoneName}}
          </div>
        </div>
      </div>

      <!--Container type-->
      <div class="row q-mb-xs details">
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">{{$t('pageMainMap.expansionItems.containerDetail.lblType')}}</div>
        </div>

        <div :class="valueWidth">
          <div v-if="getClickedContainer">
            {{selectedContainer.typeName}}
          </div>
        </div>
      </div>

      <!--Container fullness-->
      <div class="row q-mb-xs details">
        <div class="col-6">
          <div :class="aliasWidth">
            <div :class="[textSize, 'text-weight-bold']">{{$t('pageMainMap.expansionItems.containerDetail.lblFullness')}}</div>
          </div>

          <q-circular-progress
            v-if="getClickedContainer"
            :show-value="true"
            font-size="12px"
            :value="(selectedContainer.fullness >= 0 && selectedContainer.fullness <= 100) ? selectedContainer.fullness : 0"
            size="50px"
            :thickness="0.22"
            :color="getFullness"
            :track-color="selectedContainer.fullness === 100 ? 'red' : 'grey-3'"
            class="q-ma-md"
          >
            {{(selectedContainer.fullness >= 0 && selectedContainer.fullness <= 100 && selectedContainer.fullness !== null) ? `%${selectedContainer.fullness}` : $t("pageMainMap.expansionItems.containerDetail.lblNoValue")}}
          </q-circular-progress>
        </div>

        <!--Container battery-->
        <div class="col-6">
          <div :class="aliasWidth">
            <div :class="[textSize, 'text-weight-bold']">{{$t('pageMainMap.expansionItems.containerDetail.lblBattery')}}</div>
          </div>

          <q-circular-progress
            v-if="getClickedContainer"
            :show-value="true"
            font-size="12px"
            :value="(selectedContainer.battery >= 0 && selectedContainer.battery <= 100) ? selectedContainer.battery : 0"
            size="50px"
            :thickness="0.22"
            :color="getBattery"
            :track-color="selectedContainer.battery === 0 ? 'red' : 'grey-3'"
            class="q-ma-md"
          >
            {{(selectedContainer.battery >= 0 && selectedContainer.battery <= 100 && selectedContainer.battery !== null) ? `%${selectedContainer.battery}` : $t("pageMainMap.expansionItems.containerDetail.lblNoValue")}}
          </q-circular-progress>

        </div>
      </div>

      <!--Container fire risk-->
      <div class="row q-mb-xs details">
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">{{$t('pageMainMap.expansionItems.containerDetail.lblFireRisk')}}</div>
        </div>

        <div :class="valueWidth">
          <div v-if="getClickedContainer">
          <span :class="`text-${checkValue(selectedContainer.fireRisk)}`">
            {{selectedContainer.fireRisk !== null ? selectedContainer.fireRisk === true ? $t("pageMainMap.expansionItems.containerDetail.lblThere") : $t("pageMainMap.expansionItems.containerDetail.lblThereIsNot") : $t("pageMainMap.expansionItems.containerDetail.lblNoValue")}}
          </span>
          </div>
        </div>
      </div>

      <!--Container device-->
      <div class="row q-mb-xs details">
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">{{$t('pageMainMap.expansionItems.containerDetail.lblDevice')}}</div>
        </div>

        <div :class="valueWidth">
          <div v-if="getClickedContainer">
            {{selectedContainer.device}}
          </div>
        </div>
      </div>

      <!--Container last update-->
      <div class="row q-mb-xs details">
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">{{$t('pageMainMap.expansionItems.containerDetail.lblLastUpdate')}}</div>
        </div>

        <div :class="valueWidth">
          <div v-if="getClickedContainer">
          <span :class="`text-${checkValue(selectedContainer.lastUpdate)}`">
            {{selectedContainer.lastUpdate | formatDate}}
          </span>
          </div>
        </div>
      </div>

      <!--Container last collection-->
      <div class="row q-mb-xs details">
        <div :class="aliasWidth">
          <div :class="[textSize, 'text-weight-bold']">{{$t('pageMainMap.expansionItems.containerDetail.lblLastCollection')}}</div>
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
  import {mapGetters} from "vuex";
  import {i18n} from "boot/i18n";
  import {date} from "quasar";


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
          return "grey";
        } else if (battery >= 0 && battery < 50) {
          return "red";
        } else if (battery >= 50 && battery < 75) {
          return "orange";
        } else if (battery >= 75 && battery <= 100) {
          return "green";
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
          return date.formatDate(value, "DD.MM.YYYY - HH:mm");
        } else {
          // TODO i18n
          return i18n.t("pageMainMap.expansionItems.containerDetail.lblNoValue");
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
