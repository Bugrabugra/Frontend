<template>
  <div>
    <div class="row">
      <div class="col col-7 q-pl-sm">
        <div class="row">
          <ContainerCollectionsTable class="fit q-mt-sm"/>
        </div>

        <div class="row">
          <ContainerChart
            v-if="isGraphicLoaded"
            class="q-mt-sm full-width"
          />
        </div>
      </div>

      <div class="col col-5 q-pl-sm q-pr-sm">
        <div class="row items-center justify-center">
          <q-card class="q-mt-sm q-pa-none full-width" square>
            <q-card-section class="row q-ma-none q-pa-none items-center justify-center">
              <EditContainerButton class="q-ma-sm"/>
              <DrawLastFiveCoordinatesButton class="q-ma-sm"/>
            </q-card-section>
          </q-card>

        </div>

        <div class="row items-center justify-center">
          <SideMenuContainerDetail class="q-mt-sm" style="min-height: 553px"/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import SideMenuContainerDetail from "components/MainMapPage/SideMenuContainerDetail";
  import ContainerCollectionsTable from "components/ContainerPage/ContainerCollectionsTable";
  import EditContainerButton from "components/ContainerPage/EditContainerButton";
  import DrawLastFiveCoordinatesButton from "components/ContainerPage/DrawLastFiveCoordinatesButton";
  import ContainerChart from "components/ContainerPage/ContainerChart";
  import {mapActions, mapGetters} from "vuex";


  export default {
    name: "ContainerDetailPanel",

    components: {
      ContainerChart,
      DrawLastFiveCoordinatesButton,
      EditContainerButton,
      ContainerCollectionsTable,
      SideMenuContainerDetail
    },

    data() {
      return {
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
