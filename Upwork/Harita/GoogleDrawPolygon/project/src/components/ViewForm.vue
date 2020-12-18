<template>
  <v-main>
    <v-form>
      <v-container class="ma-2 pa-0">
        <v-row class="ml-2 mr-2">

          <v-col cols="5" class="ma-0 pb-0">
            <v-select
                @change="refreshMap"
                v-model="layerName"
                :items="items"
                label="Layer"
                outlined
            ></v-select>
          </v-col>

        </v-row>
      </v-container>
    </v-form>
  </v-main>
</template>

<script>
  export default {
    name: "ViewForm",

    data() {
      return {
        items: [
          "Layer 1", "Layer 2", "Layer 3", "Layer 4", "Layer 5",
          "Layer 6", "Layer 7", "Layer 8", "Layer 9", "Layer 10"
        ],
        layerName: ""
      }
    },

    methods: {
      refreshMap(payload) {
        this.$emit("refreshMap", payload)
      }
    }
  }
</script>

<style scoped>

</style>