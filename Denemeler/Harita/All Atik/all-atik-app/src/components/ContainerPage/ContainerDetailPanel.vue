<template>
  <div>
    <div class="row items-center justify-center">
      <EditContainerButton/>
    </div>

    <div class="row">
      <SideMenuContainerDetail/>
    </div>

    <div class="row">
      <ContainerCollectionsTable class="full-width"/>
    </div>

  </div>
</template>

<script>
  import SideMenuContainerDetail from "components/MainMapPage/SideMenuContainerDetail";
  import ContainerCollectionsTable from "components/ContainerPage/ContainerCollectionsTable";
  import EditContainerButton from "components/ContainerPage/EditContainerButton";
  import {mapActions} from "vuex";


  export default {
    name: "ContainerDetailPanel",

    components: {
      EditContainerButton,
      ContainerCollectionsTable,
      SideMenuContainerDetail
    },

    methods: {
      ...mapActions([
        "setClickedContainer"
      ])
    },

    mounted() {
      this.setClickedContainer()
    }
  }
</script>

<style scoped>

</style>
