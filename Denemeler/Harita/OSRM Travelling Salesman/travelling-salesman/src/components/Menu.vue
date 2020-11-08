<template>
  <div class="menu">
    <v-stepper v-model="e6" vertical>
      <v-stepper-step v-bind:complete="e6 > 1" step="1">
        Harita üzerinde durakları seçiniz
        <small>Sol fare tuşu ile haritaya tıklamanız yeterlidir</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <!--<v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>-->
        <v-expansion-panels style="max-height: 300px; overflow-x: hidden;" class="mb-4">
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
            </v-expansion-panel-header>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-btn v-if="coordinates.length > 1" color="green lighten-2" v-on:click="e6 = 2" class="ma-2">Devam</v-btn>
      </v-stepper-content>

      <v-stepper-step v-bind:complete="e6 > 2" step="2">
        Çöz düğmesine basınız
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-card color="grey lighten-3" class="mb-4" height="150px">
          <v-card-text style="font-size: 1em">
            <div><b>Sorgu sonucu:</b> {{result.code}}</div>
            <div v-if="result.trips"><b>Toplam mesafe:</b> {{result.trips[0].distance}}</div>
            <div v-if="result.trips"><b>Toplam süre:</b> {{result.trips[0].duration}}</div>
            <div v-if="result.trips"><b>Segment sayısı:</b> {{result.trips[0].legs.length}}</div>
            <div v-if="result.trips"><b>Ağırlık:</b> {{result.trips[0].weight}}</div>
            <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                bottom
                color="deep-purple accent-4"
            ></v-progress-linear>
          </v-card-text>

        </v-card>

        <v-btn v-if="!solved" color="yellow lighten-1" class="ma-2" v-on:click="solve">Çöz</v-btn>
        <v-btn v-if="solved" color="green lighten-2" v-on:click="e6 = 3" class="ma-2">Devam</v-btn>
        <v-btn color="pink lighten-2" v-on:click="e6--" class="ma-2">Geri</v-btn>
      </v-stepper-content>

      <v-stepper-step v-bind:complete="e6 > 3" step="3">
        Sonuçları kontrol ediniz
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-card color="grey lighten-3" class="mb-4">
          <v-card-text>
            <v-treeview
                v-if="result.waypoints"
                dense
                :items="fillWaypoints"
            ></v-treeview>
          </v-card-text>
        </v-card>
        <v-switch
            class="ml-4"
            color="orange"
            v-model="switch_"
            dense
            v-bind:label="`Hızlı animasyon?`"
        ></v-switch>
        <v-btn color="green lighten-2" v-on:click="e6 = 4" class="ma-2">Devam</v-btn>
        <v-btn color="orange lighten-2" v-on:click="startAnimation" class="ma-2">Oynat</v-btn>
        <v-btn color="pink lighten-2" v-on:click="e6--" class="ma-2">Geri</v-btn>
      </v-stepper-content>

      <v-stepper-step step="4">
        Sonuçları dışarı aktarabilirsiniz
      </v-stepper-step>
      <v-stepper-content step="4">
        <v-btn color="blue lighten-3" v-on:click="exportFile" class="ma-2">Dışarı aktar</v-btn>
        <v-btn color="pink lighten-2" v-on:click="e6--" class="ma-2">Geri</v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
  import {saveAs} from "file-saver";


  export default {
    name: "Menu",

    props: ["coordinates", "Result"],

    data() {
      return {
        e6: 1,
        coordinate: [],
        solved: false,
        result: {},
        loading: false,
        waypoints: [],
        switch_: false
      }
    },

    methods: {
      shortenCoordinate(coordinate) {
        return Number.parseFloat(coordinate).toFixed(4);
      },

      solve() {
        this.$emit("eventSolve");
        this.loading = true;
      },

      exportFile() {
        const fileName = "result.json";
        // Create a blob of the data
        const fileToSave = new Blob([JSON.stringify(this.result)], {
          type: 'application/json',
          name: fileName
        });

        // Save the file
        saveAs(fileToSave, fileName);
      },

      startAnimation() {
        this.$emit("eventStartAnimation", this.switch_);
      }
    },

    watch: {
      Result() {
        this.solved = true;
        this.loading = false;
        this.result = this.Result;
        this.fillWaypoints;
        console.log(this.result)
      }
    },

    computed: {
      fillWaypoints() {
        let counter = 0;
        this.result.waypoints.forEach((wp, index) => {
          this.waypoints.push({
            id: counter++,
            name: `Güzergah-${index+1}`,
            children: [
              {
                id: counter++,
                name: wp.name ? wp.name : "*Bilinmiyor*"
              }
            ]
          })
        })
        return this.waypoints;
      }
    }
  }
</script>

<style scoped>

</style>