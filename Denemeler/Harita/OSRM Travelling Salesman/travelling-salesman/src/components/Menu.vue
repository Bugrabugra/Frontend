<template>
  <div class="menu">
    <v-stepper v-model="e6" vertical>
      <v-stepper-step v-bind:complete="e6 > 1" step="1">
        Harita üzerinde durakları seçiniz
        <small>Sol fare tuşu ile haritaya tıklamanız yeterlidir</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <!--<v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>-->
        <v-expansion-panels style="max-height: 300px; overflow-x: hidden;">
          <v-expansion-panel
              readonly
              v-for="(coordinatePair,i) in coordinates"
              :key="i"
          >
            <v-expansion-panel-header color="grey lighten-3" class="pa-1">
              <v-container class="pa-0 ma-0">
                <div>
                  <v-icon color="grey">mdi-longitude</v-icon>
                  <b> Boylam:</b> {{shortenCoordinate(coordinatePair[0])}}
                </div>
                <p style="margin: 0; padding: 0;"></p>
                <div>
                  <v-icon color="grey">mdi-latitude</v-icon>
                  <b> Enlem:</b> {{shortenCoordinate(coordinatePair[1])}}
                </div>
              </v-container>

              <!--<template v-slot:actions>-->
              <!--  <v-icon color="grey" class="pr-2">-->
              <!--    mdi-trash-can-outline-->
              <!--  </v-icon>-->
              <!--</template>-->
            </v-expansion-panel-header>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-btn color="green lighten-2" v-on:click="e6 = 2" class="ma-2">Devam</v-btn>
      </v-stepper-content>

      <v-stepper-step v-bind:complete="e6 > 2" step="2">
        Çöz düğmesine basınız
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn color="yellow lighten-1" class="ma-2" v-on:click="solve">Çöz</v-btn>
        <v-btn v-if="solved" color="green lighten-2" v-on:click="e6 = 3" class="ma-2">Devam</v-btn>
        <v-btn color="pink lighten-2" v-on:click="e6--" class="ma-2">İptal</v-btn>
      </v-stepper-content>

      <v-stepper-step v-bind:complete="e6 > 3" step="3">
        Sonuçları kontrol ediniz
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn color="green lighten-2" v-on:click="e6 = 4" class="ma-2">Devam</v-btn>
        <v-btn color="pink lighten-2" v-on:click="e6--" class="ma-2">İptal</v-btn>
      </v-stepper-content>

      <v-stepper-step step="4">
        Sonuçları dışarı aktarabilirsiniz
      </v-stepper-step>
      <v-stepper-content step="4">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn block color="blue lighten-3" v-on:click="e6 = 1" class="ma-2">Dışarı aktar</v-btn>
        <v-btn color="pink lighten-2" v-on:click="e6--" class="ma-2">İptal</v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
  export default {
    name: "Menu",

    props: ["coordinates"],

    data() {
      return {
        e6: 1,
        coordinate: [],
        solved: false
      }
    },

    methods: {
      // deleteCoordinate(item) {
      //   this.coordinate = item;
      //   this.coordinateList = this.coordinates.filter(coor => {
      //     return coor !== this.coordinate;
      //   })
      //
      //   // this.$emit("eventDeleteCoordinate", this.coordinate);
      // },

      shortenCoordinate(coordinate) {
        return Number.parseFloat(coordinate).toFixed(4);
      },

      solve() {
        this.$emit("eventSolve");
      }
    },

  }
</script>

<style scoped>

</style>