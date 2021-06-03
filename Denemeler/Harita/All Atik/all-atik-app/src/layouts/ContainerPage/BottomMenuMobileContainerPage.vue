<template>
  <div class="full-width">
    <div class="justify-center">
      <q-card>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel v-if="lastFiveSensorIsOpen" name="lastFiveSensor" class="q-ma-none q-pa-none">
            <ContainerChart v-if="isGraphicLoaded"/>
          </q-tab-panel>

          <q-tab-panel v-if="lastCollectionsIsOpen" name="lastCollections" class="q-ma-none q-pa-none">
            <ContainerCollectionsTable class="fit q-mt-sm"/>
          </q-tab-panel>

          <q-tab-panel v-if="spatialIsOpen" name="spatial" class="q-ma-none q-pa-none">
            <div class="flex q-ma-md justify-evenly">
              <EditContainerButton class="q-mb-sm"/>
              <DrawLastFiveCoordinatesButton/>
            </div>
          </q-tab-panel>

          <q-tab-panel v-if="infoIsOpen" name="info" class="q-ma-none q-pa-none">
            <SideMenuContainerDetail/>
          </q-tab-panel>
        </q-tab-panels>

        <q-separator/>

        <q-tabs
          v-model="tab"
          class="bg-grey-3"
          align="justify"
          narrow-indicator
          active-color="blue-14"
          dense
        >
          <q-tab icon="sensors" name="lastFiveSensor" label="SENSÖR VERİSİ" @click="openLastFiveSensor"/>
          <q-tab icon="local_shipping" name="lastCollections" label="SON TOPLAMALAR" @click="openLastCollections"/>
          <q-tab icon="public" name="spatial" label="COĞRAFİ İŞLEMLER" @click="openSpatial"/>
          <q-tab icon="info" name="info" label="DETAY" @click="openInfo"/>
        </q-tabs>
      </q-card>
    </div>
  </div>
</template>

<script>
  import ContainerChart from "components/ContainerPage/ContainerChart";
  import ContainerCollectionsTable from "components/ContainerPage/ContainerCollectionsTable";
  import DrawLastFiveCoordinatesButton from "components/ContainerPage/DrawLastFiveCoordinatesButton";
  import EditContainerButton from "components/ContainerPage/EditContainerButton";
  import SideMenuContainerDetail from "components/MainMapPage/SideMenuContainerDetail";
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "BottomMenuMobileContainerPage",

    components: {
      SideMenuContainerDetail,
      EditContainerButton,
      DrawLastFiveCoordinatesButton,
      ContainerCollectionsTable,
      ContainerChart
    },

    data() {
      return {
        tab: "lastFiveSensor",
        lastFiveSensorIsOpen: true,
        lastCollectionsIsOpen: true,
        spatialIsOpen: true,
        infoIsOpen: true,
        isGraphicLoaded: false
      }
    },

    computed: {
      ...mapGetters([
        "getSettings"
      ])
    },

    methods: {
      ...mapActions([
        "setCurrentContainer"
      ]),

      loadGraphic() {
        setTimeout(() => {
          this.isGraphicLoaded = true;
        }, 1500)
      },

      openLastFiveSensor() {
        if (this.tab === "lastFiveSensor") {
          this.lastFiveSensorIsOpen = !this.lastFiveSensorIsOpen;
        }
      },

      openLastCollections() {
        if (this.tab === "lastCollections") {
          this.lastCollectionsIsOpen = !this.lastCollectionsIsOpen;
        }
      },

      openSpatial() {
        if (this.tab === "spatial") {
          this.spatialIsOpen = !this.spatialIsOpen;
        }
      },

      openInfo() {
        if (this.tab === "info") {
          this.infoIsOpen = !this.infoIsOpen;
        }
      }
    },

    watch: {
      tab() {
        this.lastFiveSensorIsOpen = true;
        this.lastCollectionsIsOpen = true;
        this.spatialIsOpen = true;
        this.infoIsOpen = true;
      },

      containerSelected() {
        this.tab = "info";
        this.infoIsOpen = true;
      }
    },

    mounted() {
      this.loadGraphic();

      this.setCurrentContainer({
        containerID: this.getSettings.containerID
      })
    }
  }
</script>

<style scoped>
  .q-item__section--avatar {
    min-width: 0;
  }

  .q-item__section--side {
    padding-right: 5px;
  }

  .q-item.q-item-type {
    border-bottom: #d5d4d4 1px solid;
  }

  .q-tab__content .material-icons.q-icon.notranslate {
    color: #6d7171;
  }
</style>
