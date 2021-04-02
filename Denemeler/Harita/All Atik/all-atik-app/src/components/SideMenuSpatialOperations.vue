<template>
  <q-card style="width: 100%;">
    <q-card-section>
      <div class="col">
        <div class="row justify-center">
          <q-btn
            :disable="!this.$store.getters.getClickedContainer"
            @click="updateGeometry"
            :label="this.$store.getters.updatingGeometry ? 'Geometri Düzenleniyor' : 'Geometri Düzenle'"
            :color="!this.$store.getters.getClickedContainer ? 'grey-5' : 'blue-6'"
            :outline="this.$store.getters.updatingGeometry"
            class="q-ma-sm full-width"
          />
        </div>

        <div class="row justify-center">
          <q-btn
            @click="$store.dispatch('createRoute', true)"
            class="q-ma-sm full-width"
            color="orange-6"
            label="Rota oluştur"
          />
        </div>

        <div class="row justify-center">
          <q-btn
            @click="$store.dispatch('setMyLocation')"
            class="q-ma-sm full-width"
            color="green-6"
            label="Konumumu Bul"
          />
        </div>
      </div>

    </q-card-section>
  </q-card>
</template>

<script>
  import {mapActions} from "vuex";


  export default {
    name: "SideMenuSpatialOperations",

    methods: {
      ...mapActions({
        updateGeometry: "updatingGeometry"
      }),
    }
  }
</script>

<style scoped>

</style>
