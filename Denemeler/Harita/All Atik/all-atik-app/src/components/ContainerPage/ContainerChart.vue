<template>
  <q-card square>
    <q-card-section>
      <Chart :chart-data="chartData" :options="options"/>
    </q-card-section>
  </q-card>
</template>

<script>
  import {mapGetters} from "vuex";
  import {apiGetDataStream} from "src/api";
  import Chart from "components/ContainerPage/chart";


  export default {
    components: {Chart},

    data() {
      return {
        chartData: null,
        temperatureArray: [],
        fullnessArray: [],
        batteryArray: [],
        dates: [],
        options: {
          title: {
            display: true,
            text: this.$t("pageContainer.lastFiveSensorValue.lblHeader"),
          },

          scales: {
            xAxes: [{
              ticks: {
                autoSkip: false,
                autoSkipPadding: -40,
              }
            }]
          }
        }
      }
    },

    computed: {
      ...mapGetters([
        "getSettings",
        "getClickedContainer"
      ])
    },

    methods: {
      getDataStream() {
        apiGetDataStream(
          this.getClickedContainer.container.id ?
            this.getClickedContainer.container.id : this.getSettings.containerID,
          this.getSettings.jwt
        )
          .then(response => {
            this.temperatureArray = response.data.map(item => {
              return item.temperature;
            })

            this.fullnessArray = response.data.map(item => {
              return item.fullness;
            })

            this.batteryArray = response.data.map(item => {
              return item.battery;
            })

            this.dates = response.data.map(item => {
              return item.sensorReadDate;
            })

            this.chartData = {
              labels: this.dates,
              datasets: [
                {
                  label: this.$t("pageContainer.lastFiveSensorValue.lblTemperature"),
                  backgroundColor: "#F6B283",
                  data: this.temperatureArray
                },
                {
                  label: this.$t("pageContainer.lastFiveSensorValue.lblFullness"),
                  backgroundColor: "#ADC187",
                  data: this.fullnessArray
                },
                {
                  label: this.$t("pageContainer.lastFiveSensorValue.lblBattery"),
                  backgroundColor: "#8BABD5",
                  data: this.batteryArray
                }
              ]
            };
          })
      }
    },

    watch: {
      getClickedContainer() {
        this.getDataStream()
      }
    },

    mounted () {
      this.getDataStream();
    }
  }
</script>
