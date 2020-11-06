<template>
  <div id="mapContainer" style="height: 100vh">

  </div>
</template>

<script>
  import 'ol/ol.css';
  import {Map, View} from 'ol';
  import TileLayer from 'ol/layer/Tile';
  import OSM from 'ol/source/OSM';
  import {fromLonLat} from "ol/proj";
  import VectorSource from 'ol/source/Vector';
  import VectorLayer from 'ol/layer/Vector';
  import {Style, Stroke, Icon} from 'ol/style';
  import {transform} from 'ol/proj';
  import Feature from "ol/Feature";
  import Point from "ol/geom/Point";
  import myIcon from "../../public/red-map-pin-with-shadow.png"
  import Polyline from "ol/format/Polyline";


  export default {
    name: "Main",

    data() {
      return {
        arrayCoordinates: [],
        map: {},
        urlOSRMNearest: '//router.project-osrm.org/nearest/v1/driving/',
        urlOSRMTrip: '//router.project-osrm.org/trip/v1/driving/',
        vectorSource: new VectorSource(),
        styles: {
          route: new Style({
            stroke: new Stroke({
              width: 6,
              color: [40, 40, 40, 0.8]
            })
          }),
          icon: new Style({
            image: new Icon({
              anchor: [0, 0],
              src: myIcon,
              scale: 0.1
            })
          })
        },
        queryString: ""
      }
    },

    props: ["coordDel", "eventSolve"],

    methods: {
      initMap() {
        this.map = new Map({
          target: 'mapContainer',
          layers: [
            new TileLayer({
              source: new OSM()
            })
          ],
          view: new View({
            center: [0, 0],
            zoom: 0
          })
        });

        this.map.on("click", this.clickOnMap);
        this.map.addLayer(this.vectorLayer);
      },

      async clickOnMap(e) {
        this.arrayCoordinates.push(e.coordinate);
        await this.getNearest(e.coordinate)
          .then((coordStreet) => {
            this.createFeature(coordStreet);
          })
      },

      createFeature(coord) {
        const feature = new Feature({
          type: 'place',
          geometry: new Point(fromLonLat(coord))
        });
        feature.setStyle(this.styles.icon);
        this.vectorSource.addFeature(feature);
      },

      getNearest(coord){
        const coord4326 = this.to4326(coord);
        const queryLink = this.urlOSRMNearest + coord4326.join();
        return new Promise(function(resolve, reject) {
          //make sure the coord is on street
          fetch(queryLink).then(function(response) {
            // Convert to JSON
            return response.json();
          }).then(function(json) {
            if (json.code === 'Ok') {
              resolve(json.waypoints[0].location);
            } else {
              reject();
            }
          });
        });
      },

      to4326(coord) {
        return transform([
          parseFloat(coord[0]), parseFloat(coord[1])
        ], 'EPSG:3857', 'EPSG:4326');
      },

      solve() {
        const _this = this;
        this.generateQueryString().then(res => {
          new Promise(function() {
            //make sure the coord is on street
            fetch(_this.urlOSRMTrip + `${res}?source=first&destination=last`).then(function(response) {
              // Convert to JSON
              return response.json();
            }).then(function(json) {
              if (json.code === 'Ok') {
                // Emit the event
                _this.$emit("eventSolved", json);

                const route = new Polyline({
                  factor: 1e5
                }).readGeometry(json.trips[0].geometry, {
                  dataProjection: 'EPSG:4326',
                  featureProjection: 'EPSG:3857'
                });
                const feature = new Feature({
                  type: 'route',
                  geometry: route
                });
                feature.setStyle(_this.styles.route);
                _this.vectorSource.addFeature(feature);
              }
            });
          });
        });
      },

      async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      },

      async generateQueryString() {
        await this.asyncForEach(this.arrayCoordinates, async (item) => {
          await this.getNearest(item)
            .then((coordStreet) => {
              this.queryString += `${coordStreet[0]},${coordStreet[1]};`
            })
        })
        return this.queryString.slice(0, -1);
      },

    },

    mounted() {
      this.initMap();
    },

    watch: {
      arrayCoordinates() {
        this.$emit("eventCoordinateAdded", this.arrayCoordinates);
      },

      eventSolve() {
        this.solve();
      }
    },

    computed: {
      vectorLayer() {
        return new VectorLayer({
          source: this.vectorSource
        })
      }
    }
  }
</script>

<style scoped>

</style>