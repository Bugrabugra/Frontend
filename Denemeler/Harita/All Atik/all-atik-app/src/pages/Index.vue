<template>
  <q-page-container>
    <q-page>
      <div class="row">
        <div :class="['col', mapSize]" :style="[mapStyle]">
          <Map/> <!--main-map-page / container-page-->
        </div>

        <!--Side menu desktop or mobile-->
        <div v-if="page === 'main-map-page' && (pageSize !== 'xs' && pageSize !== 'sm')" :class="['col', 'bg-indigo-1', sideMenuSize]">
          <SideMenuDesktop/>
        </div>

        <!--Edit container menu-->
        <div
          v-if="page === 'container-page'" class="col col-6">
          <!--Side menu-->
          <div>
            <ContainerDetailPanel/>
          </div>
        </div>

      </div>

      <div v-if="page === 'main-map-page' && (pageSize === 'xs' || pageSize === 'sm')">
        <BottomMenuMobile style="position: absolute; bottom: 0;"/>
      </div>

    </q-page>
  </q-page-container>
</template>

<script>
  import Map from "components/Map";
  import EditContainer from "components/ContainerPage/EditContainerButton";
  import EditContainerButton from "components/ContainerPage/EditContainerButton";
  import ContainerDetailPanel from "components/ContainerPage/ContainerDetailPanel";


  export default {
    name: 'PageIndex',

    components: {
      ContainerDetailPanel,
      EditContainerButton,
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
        if (this.pageSize !== "xs" && this.pageSize !== "sm") {
          if (this.page === "container-page") {
            return "col-6"
          } else if (this.page === "main-map-page") {
            if (this.pageSize === "md") {
              return "col-9";
            } else {
              return "col-10";
            }
          }
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
      },

      sideMenuSize() {
        if (this.page === "main-map-page") {
          if (this.pageSize === "xl" || this.pageSize === "lg") {
            return "col-2";
          } else {
            return "col-3";
          }
        }
      }
    }
  }
</script>

<style>
  .notifier-fire-risk {
    width: 370px;
  }

  .notifier-fullness {
    width: 370px;
  }
</style>
