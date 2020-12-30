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

          <v-col cols="5" class="ma-0 pb-0">
            <v-text-field
                v-model="row"
                label="Row Count"
                outlined
                required
            ></v-text-field>
          </v-col>

          <v-col cols="5" class="ma-0 pb-0">
            <v-text-field
                v-model="column"
                label="Column Count"
                outlined
                required
            ></v-text-field>
          </v-col>

          <v-col cols="5" class="ma-0 pb-0">
            <v-text-field
                v-model="gapHeight"
                label="Gap Height"
                outlined
                required
            ></v-text-field>
          </v-col>

          <v-col cols="5" class="ma-0 pb-0">
            <v-text-field
                v-model="gapWidth"
                label="Gap Width"
                outlined
                required
            ></v-text-field>
          </v-col>

          <v-col cols="5" class="ma-0 pb-0">
            <v-text-field
                v-model="angle"
                label="Angle"
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
        width: 0,
        height: 0,
        row: 0,
        column: 0,
        gapWidth: 0,
        gapHeight: 0,
        angle: 0
      }
    },

    computed: {
      isValidDraw() {
        if (this.seedType && this.fieldName) {
          return true
        }
      },

      isValidPlace() {
        if (this.width && this.height) {
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
            height: this.height,
            row: this.row,
            column: this.column,
            gapWidth: this.gapWidth,
            gapHeight: this.gapHeight,
            angle: this.angle
          }
        )
      },
    }
  }
</script>

<style scoped>

</style>