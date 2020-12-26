<template>
  <v-main>
    <v-form>
      <v-container class="ma-2 pa-0">
        <v-row class="ml-2 mr-2">

          <v-col cols="5" class="ma-0 pb-0">
            <v-text-field
                v-model="fieldName"
                label="Field Name"
                required
                outlined
            ></v-text-field>
          </v-col>

          <v-col cols="5" class="ma-0 pb-0">
            <v-text-field
                v-model="seedType"
                label="Seed"
                outlined
                required
            ></v-text-field>
          </v-col>

          <v-col cols="2">
            <v-btn
                :disabled="!isValidDraw"
                @click.prevent="saveField"
                block
                outlined
                color="blue"
                min-height="55px"
            >Save Field
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="ml-2 mr-2">

          <v-col cols="5" class="ma-0 pb-0">
            <v-text-field
                v-model="lat"
                label="Latitude"
                required
                outlined
            ></v-text-field>
          </v-col>

          <v-col cols="5" class="ma-0 pb-0">
            <v-text-field
                v-model="lon"
                label="Longitude"
                outlined
                required
            ></v-text-field>
          </v-col>

          <v-col cols="5" class="ma-0 pb-0">
            <v-text-field
                v-model="height"
                label="Height"
                outlined
                required
            ></v-text-field>
          </v-col>

          <v-col cols="5" class="ma-0 pb-0">
            <v-text-field
                v-model="width"
                label="Width"
                outlined
                required
            ></v-text-field>
          </v-col>

          <v-col cols="2">
            <v-btn
                :disabled="!isValidPlace"
                @click.prevent="placeField"
                block
                outlined
                color="blue"
                min-height="55px"
            >Place Field
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-main>
</template>

<script>
  export default {
    name: "EditField",

    data() {
      return {
        fieldName: "",
        seedType: "",
        lon: "",
        lat: "",
        width: "",
        height: ""
      }
    },

    computed: {
      isValidDraw() {
        if (this.seedType && this.fieldName) {
          return true
        }
      },

      isValidPlace() {
        if (this.lat && this.lon && this.width && this.height) {
          return true
        }
      }
    },

    methods: {
      saveField() {
        this.$emit(
          "evtSaveField",
          {
            seedType: this.seedType,
            fieldName: this.fieldName
          }
        )
      },

      placeField() {
        this.$emit(
          "evtPlaceField",
          {
            lat: this.lat,
            lon: this.lon,
            width: this.width,
            height: this.height
          }
        )
      },
    }
  }
</script>

<style scoped>

</style>