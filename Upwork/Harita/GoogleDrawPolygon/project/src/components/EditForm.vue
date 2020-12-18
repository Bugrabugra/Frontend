<template>
  <v-main>
    <v-form>
      <v-container class="ma-2 pa-0">
        <v-row class="ml-2 mr-2">

          <v-col cols="5" class="ma-0 pb-0">
            <v-text-field
                v-model="territoryName"
                label="Territory Name"
                required
                outlined
            ></v-text-field>
          </v-col>

          <v-col cols="5" class="ma-0 pb-0">
            <v-select
                v-model="layerName"
                :items="items"
                label="Layer"
                outlined
            ></v-select>
          </v-col>

          <v-col cols="2">
            <v-btn
                :disabled="!isValid"
                @click.prevent="savePolygon"
                block
                outlined
                color="blue"
                min-height="55px"
            >Save Territory
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-main>
</template>

<script>
  export default {
    name: "EditForm",

    data() {
      return {
        territoryName: "",
        layerName: "",
        items: [
          "Layer 1", "Layer 2", "Layer 3", "Layer 4", "Layer 5",
          "Layer 6", "Layer 7", "Layer 8", "Layer 9", "Layer 10"
        ]
      }
    },

    computed: {
      isValid() {
        if (this.territoryName && this.layerName) {
          return true
        }
      }
    },

    methods: {
      savePolygon() {
        this.$emit(
          "evtSavePolygon",
          {
            layerName: this.layerName,
            territoryName: this.territoryName
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>