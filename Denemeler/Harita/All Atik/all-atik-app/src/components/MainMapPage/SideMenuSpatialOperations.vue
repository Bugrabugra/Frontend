<template>
  <q-card style="width: 100%;">
    <q-card-section>
      <div class="row justify-center">
        <div class="col-6 q-pa-sm">
          <q-btn
            :disable="!getClickedContainer"
            @click="updateGeometry"
            :label="updatingGeometry ? 'Geometri Düzenleniyor' : 'Geometri Düzenle'"
            :color="!getClickedContainer ? 'grey-5' : 'purple-3'"
            :outline="updatingGeometry"
          />
        </div>

        <div class="col-6 q-pa-sm">
          <q-btn
            @click="$store.dispatch('createRoute', true)"
            color="orange-6"
            label="ROTA OLUŞTUR"
          />
        </div>
      </div>

      <div class="row justify-center">
        <div class="col-6 q-pa-sm">
          <q-btn
            @click="$store.dispatch('setMyLocation')"
            color="green-6"
            label="KONUMUMU BUL"
          />
        </div>

        <div class="col-6 q-pa-sm">
          <q-btn
            @click="$store.dispatch('setQueryPolygon')"
            color="cyan-9"
            label="AlAN İLE SORGULA"
          />
        </div>
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
        "updatingGeometry"
      ])
    },

    methods: {
      ...mapActions({
        updateGeometry: "updatingGeometry"
      }),
    }
  }
</script>
