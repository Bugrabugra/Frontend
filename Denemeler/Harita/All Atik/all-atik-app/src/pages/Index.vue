<template>
  <q-page-container>
    <q-page>
      <div class="row">
        <div
         :class="['col', mapSize]"
         :style="[mapStyle]"
        >
         <!--main-map-page / container-page-->
          <Map/>
        </div>

        <!--Side menu desktop or mobile-->
        <div v-if="page === 'main-map-page' && pageSize !== 'xs'" class="col col-2 bg-indigo-1">
          <SideMenuDesktop/>
        </div>

        <!--Edit container menu-->
        <div
          v-if="page === 'container-page'"
          style="bottom: 5%"
          class="row justify-center items-center absolute full-width transparent"
        >
          <EditContainer/>
        </div>
      </div>

      <div v-if="page === 'main-map-page' && pageSize === 'xs'">
        <BottomMenuMobile style="position: absolute; bottom: 0;"/>
      </div>

    </q-page>
  </q-page-container>
</template>

<script>
  import Map from "components/Map";
  import EditContainer from "components/EditContainer";


  export default {
    name: 'PageIndex',

    components: {
      BottomMenuMobile: () => import("components/BottomMenuMobile"),
      SideMenuDesktop: () => import("components/SideMenuDesktop"),
      EditContainer,
      Map
    },

    computed: {
      page() {
        return this.$store.getters.getSettings.page;
      },

      pageSize() {
        return this.$q.screen.name;
      },

      mapSize() {
        if (this.pageSize !== "xs") {
          if (this.page === "main-map-page") {
            return "col-10";
          } else {
            return "col-12";
          }
        } else {
          return "col-12";
        }
      },

      mapStyle() {
        if (this.pageSize !== "xs") {
          if (this.page === "container-page") {
            return "position: relative;";
          } else {
            return "";
          }
        } else {
          return "position: relative"
        }
      }
    }
  }
</script>
