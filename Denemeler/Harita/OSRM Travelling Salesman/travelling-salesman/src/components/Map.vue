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
  import {Style, Stroke, Icon, Circle, Fill} from 'ol/style';
  import {transform} from 'ol/proj';
  import Feature from "ol/Feature";
  import Point from "ol/geom/Point";
  import myIcon from "../../public/red-map-pin-with-shadow.png"
  import Polyline from "ol/format/Polyline";
  import {getVectorContext} from 'ol/render';


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
              color: [0, 181, 207, 0.8]
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
        queryString: "",
        animationSpeed: 5,
        animating: false,
        speed: null,
        now: null,
        routeLength: 0,
        geoMarker: null,
        routeCoords: null
      }
    },

    props: ["coordDel", "eventSolve", "animation"],

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
            center: [3226072.3324407726, 5011270.775279443],
            zoom: 10
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
                _this.routeCoords = route.getCoordinates();
                _this.routeLength = _this.routeCoords.length;

                _this.geoMarker = (new Feature(
                  {
                    type: 'geoMarker',
                    geometry: new Point(_this.routeCoords[0]),
                  }
                ));

                const feature = new Feature({
                  type: 'route',
                  geometry: route
                });
                feature.setStyle(_this.styles.route);
                _this.vectorSource.addFeature(feature);
                _this.vectorSource.addFeature(_this.geoMarker);

                // _this.startAnimation();
              }
            });
          });
        });
      },

      moveFeature(event) {
        const styles = {
          'geoMarker': new Style({
            image: new Circle({
              radius: 7,
              fill: new Fill({color: 'black'}),
              stroke: new Stroke({
                color: 'white',
                width: 2,
              }),
            }),
          }),
        };

        const vectorContext = getVectorContext(event);
        const frameState = event.frameState;

        if (this.animating) {
          const elapsedTime = frameState.time - this.now;
          // here the trick to increase speed is to jump some indexes
          // on lineString coordinates
          const index = Math.round((this.speed * elapsedTime) / 1000);

          if (index >= this.routeLength) {
            this.stopAnimation(true);
            return;
          }

          const currentPoint = new Point(this.routeCoords[index]);
          const feature = new Feature(currentPoint);
          vectorContext.drawFeature(feature, styles.geoMarker);
        }
        // tell OpenLayers to continue the postrender animation
        this.map.render();
      },

      startAnimation() {
        if (this.animating) {
          this.stopAnimation(false);
        } else {
          this.animating = true;
          this.now = new Date().getTime();
          this.speed = this.animationSpeed;
          // hide geoMarker
          this.geoMarker.setStyle(null);
          // just in case you pan somewhere else
          this.vectorLayer.on('postrender', this.moveFeature);
          this.map.render();
        }
      },

      stopAnimation(ended) {
        this.animating = false;

        // if animation cancelled set the marker at the beginning
        const coord = ended ? this.routeCoords[this.routeLength - 1] : this.routeCoords[0];
        const geometry = this.geoMarker.getGeometry();
        geometry.setCoordinates(coord);
        //remove listener
        this.vectorLayer.un('postrender', this.moveFeature);
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
      },

      animation() {
        if (this.animation.speed === "fast") {
          this.animationSpeed = 20;
          this.startAnimation();
        } else {
          this.animationSpeed = 5;
          this.startAnimation();
        }
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