<template>
  <q-page-container>
    <q-page>
      <div class="row">
        <div :class="['col', mapSize]" :style="[mapStyle]">
          <Map/> <!--main-map-page / container-page / zone-page -->
        </div>

        <!--Side menu desktop-->
        <div v-if="page === 'main-map-page' && (pageSize !== 'xs' && pageSize !== 'sm')" :class="['col', 'bg-indigo-1', sideMenuSize]">
          <SideMenuDesktopMainMapPage/>
        </div>

        <!--Edit container menu-->
        <div v-if="page === 'container-page' && (pageSize !== 'xs' && pageSize !== 'sm')" class="col col-6">
          <!--Side menu-->
          <div>
            <ContainerDetailPanel/>
          </div>
        </div>

        <!--Edit zone menu-->
        <div v-if="page === 'zone-page'">
          <EditZoneButtons class="absolute absolute-bottom justify-center" style="bottom: 30px;"/>
        </div>

        <!--Edit zone menu-->
        <div v-if="page === 'edit-container-page'">
          <EditContainerPageButtons class="absolute absolute-bottom justify-center" style="bottom: 30px;"/>
        </div>

      </div>

      <!--Bottom menu mobile-->
      <div v-if="page === 'main-map-page' && (pageSize === 'xs' || pageSize === 'sm')">
        <BottomMenuMobileMainMapPage style="position: absolute; bottom: 0;"/>
      </div>

      <div v-if="page === 'container-page' && (pageSize === 'xs' || pageSize === 'sm')">
        <BottomMenuMobileContainerPage style="position: absolute; bottom: 0;"/>
      </div>

    </q-page>
  </q-page-container>
</template>

<script>
  import Map from "components/Map";
  import EditContainer from "components/ContainerPage/EditContainerButton";
  import EditContainerButton from "components/ContainerPage/EditContainerButton";
  import ContainerDetailPanel from "components/ContainerPage/ContainerRightPanel";
  import EditZoneButtons from "components/ZonePage/EditZoneButtons";
  import EditContainerPageButtons from "components/EditContainerPage/EditContainerPageButtons";


  export default {
    name: 'PageIndex',

    components: {
      EditContainerPageButtons,
      EditZoneButtons,
      ContainerDetailPanel,
      EditContainerButton,
      BottomMenuMobileMainMapPage: () => import("layouts/MainMapPage/BottomMenuMobileMainMapPage"),
      SideMenuDesktopMainMapPage: () => import("layouts/MainMapPage/SideMenuDesktopMainMapPage"),
      BottomMenuMobileContainerPage: () => import("layouts/ContainerPage/BottomMenuMobileContainerPage"),
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
