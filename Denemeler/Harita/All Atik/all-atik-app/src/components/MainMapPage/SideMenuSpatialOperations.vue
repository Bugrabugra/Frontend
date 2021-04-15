<template>
  <q-card style="width: 100%;">
    <q-card-section>
      <div :class="[spatialMenuSize, 'row', 'justify-center']">
        <q-btn
          v-if="!updatingGeometry"
          :disable="!getClickedContainer"
          @click="updateGeometry"
          :label="$t('pageMainMap.expansionItems.spatialOperations.btnEditGeometry')"
          :color="!getClickedContainer ? 'grey-5' : 'blue-3'"
          class="q-ma-xs"
          style="min-width: 201px;"
          icon="edit_location_alt"
        />

        <q-btn
          v-if="updatingGeometry"
          @click="updateGeometry"
          :label="$t('pageMainMap.expansionItems.spatialOperations.btnEditGeometryCancel')"
          color="blue-3"
          outline
          class="q-ma-xs"
          style="min-width: 201px;"
          icon="wrong_location"
        />

        <q-btn
          @click="$store.dispatch('createRoute', true)"
          color="orange-4"
          :label="$t('pageMainMap.expansionItems.spatialOperations.btnCreateRoute')"
          class="q-ma-xs"
          style="min-width: 201px;"
          icon="local_shipping"
        />

        <q-btn
          @click="$store.dispatch('setMyLocation')"
          color="green-4"
          :label="$t('pageMainMap.expansionItems.spatialOperations.btnFindMyLocation')"
          class="q-ma-xs"
          style="min-width: 201px;"
          icon="my_location"
        />

      </div>
    </q-card-section>
  </q-card>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";


  export default {
    name: "SideMenuSpatialOperations",

    computed: {
      ...mapGetters([
        "getClickedContainer",
        "updatingGeometry",
      ]),

      pageSize() {
        return this.$q.screen.name;
      },
    },

    methods: {
      ...mapActions({
        updateGeometry: "updatingGeometry"
      }),

      spatialMenuSize() {
        if (this.pageSize === "xl") {
          return "q-ma-sm";
        }
      }
    }
  }
</script>
