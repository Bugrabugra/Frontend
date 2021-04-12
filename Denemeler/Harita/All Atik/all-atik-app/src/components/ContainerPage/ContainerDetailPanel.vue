<template>
  <div>
    <div class="row items-center justify-center">
      <EditContainerButton/>
      <DrawLastFiveCoordinates/>
    </div>

    <div class="row">
      <div class="col col-5 q-pl-sm container-page">
        <ContainerCollectionsTable class="full-width"/>
      </div>

      <div class="col col-7 q-pl-sm q-pr-sm container-page">
        <SideMenuContainerDetail/>
      </div>
    </div>

    <!--<div class="row">-->
    <!--  -->
    <!--</div>-->

  </div>
</template>

<script>
  import SideMenuContainerDetail from "components/MainMapPage/SideMenuContainerDetail";
  import ContainerCollectionsTable from "components/ContainerPage/ContainerCollectionsTable";
  import EditContainerButton from "components/ContainerPage/EditContainerButton";
  import {mapActions, mapGetters} from "vuex";
  import DrawLastFiveCoordinates from "components/ContainerPage/DrawLastFiveCoordinates";


  export default {
    name: "ContainerDetailPanel",

    components: {
      DrawLastFiveCoordinates,
      EditContainerButton,
      ContainerCollectionsTable,
      SideMenuContainerDetail
    },

    computed: {
      ...mapGetters([
        "getSettings"
      ])
    },

    methods: {
      ...mapActions([
        "setCurrentContainer"
      ])
    },

    mounted() {
      this.setCurrentContainer({
        containerID: this.getSettings.containerID
      })
    }
  }
</script>

<style>
  .container-page .container-detail {
    min-height: 520px;
  }
</style>
