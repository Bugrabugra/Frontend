<template>
  <q-page-container>
    <q-page>
      <div class="row">
       <div
         :class="['col', page === 'main-map-page' ? 'col-10' : 'col-12']"
         :style="page === 'container-page' ? 'position: relative' : ''"
       >
         <!--main-map-page / container-page-->
         <Map/>
       </div>

        <div v-if="page === 'main-map-page'" class="col col-2">
          <SideMenu/>
        </div>

        <div
          v-if="page === 'container-page'"
          style="bottom: 5%"
          class="row justify-center items-center absolute full-width transparent"
        >
          <EditContainer/>
        </div>



      </div>
    </q-page>
  </q-page-container>
</template>

<script>
  import Map from "components/Map";
  import SideMenu from "components/SideMenu";
  import {api} from "boot/axios";
  import EditContainer from "components/EditContainer";


  export default {
    name: 'PageIndex',

    components: {
      EditContainer,
      SideMenu,
      Map
    },

    computed: {
      page() {
        return this.$store.getters.getSettings.page;
      }
    },

    methods: {
      getSettings() {
        api.get("/settings")
          .then(response => {
            this.$store.dispatch("setSettings", response.data[0]);
          })
      }
    },

    mounted() {
      this.getSettings();
    }
  }
</script>
