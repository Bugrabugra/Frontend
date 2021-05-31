<template>
  <div class="row">
    <FindMyLocation/>
    <EditContainerButton/>
  </div>
</template>

<script>
  import FindMyLocation from "components/_Global/FindMyLocation";
  import EditContainerButton from "components/ContainerPage/EditContainerButton";
  import {mapGetters} from "vuex";


  export default {
    name: "EditContainerPageButtons",

    components: {
      EditContainerButton,
      FindMyLocation},

    computed: {
      ...mapGetters(["getMap"]),
      containerID() {
        return this.$store.getters.getSettings.containerID;
      }
    },

    methods: {
      getContainer() {
        this.$store.dispatch(
          "getContainer",
          {containerID: this.containerID}
        );
      }
    },

    watch: {
      getMap() {
        this.getContainer();
      }
    }
  }
</script>
