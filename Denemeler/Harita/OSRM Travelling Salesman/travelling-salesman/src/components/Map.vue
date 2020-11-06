<template>
  <div id="mapContainer" style="height: 100vh">

  </div>
</template>

<script>
  import 'ol/ol.css';
  import {Map, View} from 'ol';
  import TileLayer from 'ol/layer/Tile';
  import OSM from 'ol/source/OSM';
  // import {toLonLat} from "ol/proj";
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
        map: {}
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
      },

      clickOnMap(e) {
        console.log("Coordinate added: ", (e.coordinate));
        this.arrayCoordinates.push(e.coordinate);
      },

      solve() {
        // const points = [];
        const urlOSRMNearest = '//router.project-osrm.org/nearest/v1/driving/';
        const urlOSRMTrip = '//router.project-osrm.org/trip/v1/driving/';
        const vectorSource = new VectorSource()
        const vectorLayer = new VectorLayer({
            source: vectorSource
          }),
          styles = {
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
          };

        const utils = {
          getNearest: function(coord){
            const coord4326 = utils.to4326(coord);
            return new Promise(function(resolve, reject) {
              //make sure the coord is on street
              fetch(urlOSRMNearest + coord4326.join()).then(function(response) {
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

          createFeature: function(coord) {
            const feature = new Feature({
              type: 'place',
              geometry: new Point(fromLonLat(coord))
            });
            feature.setStyle(styles.icon);
            vectorSource.addFeature(feature);
          },

          to4326: function(coord) {
            return transform([
              parseFloat(coord[0]), parseFloat(coord[1])
            ], 'EPSG:3857', 'EPSG:4326');
          }
        }

        var queryString = "";
        const generateQueryString = async () => {
          this.arrayCoordinates.forEach(coordinate => {
            const newCoordinates = utils.getNearest(coordinate)
            newCoordinates.then(function(coordStreet){
              queryString += `${coordStreet[0]}, ${coordStreet[1]};`
              utils.createFeature(coordStreet);
            })
          })
          return queryString;
        }

        (async () => {
          const result = await generateQueryString()
          console.log(result)
        })()


        new Promise(function() {
          //make sure the coord is on street
          fetch(urlOSRMTrip + "13.388860,52.517037;13.397634,52.529407;13.428555,52.523219;13.418555,52.523215?source=first&destination=last").then(function(response) {
            // Convert to JSON
            return response.json();
          }).then(function(json) {
            if (json.code === 'Ok') {
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
              feature.setStyle(styles.route);
              vectorSource.addFeature(feature);
              console.log(feature);
            }
          });
        });

        this.map.addLayer(vectorLayer);
      }
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
    }
  }
</script>

<style scoped>

</style>