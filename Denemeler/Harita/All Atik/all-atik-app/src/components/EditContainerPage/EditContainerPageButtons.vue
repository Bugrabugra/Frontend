<template>
  <div class="row">
    <FindMyLocation/>
    <EditContainerButton/>
  </div>
</template>

<script>
  import FindMyLocation from "components/_Global/FindMyLocation";
  import EditContainerButton from "components/ContainerPage/EditContainerButton";


  export default {
    name: "EditContainerPageButtons",

    components: {
      EditContainerButton,
      FindMyLocation},

    data() {
      return {}
    },

    computed: {
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

    mounted() {
      this.getContainer();
    }
  }
</script>
