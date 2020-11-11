import Vue from "vue";
import Vuex from "vuex";
import VectorSource from "ol/source/Vector";
import {Circle, Fill, Icon, Stroke, Style} from "ol/style";
import Pin from "../../public/red-map-pin-with-shadow.png";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    map: {
      arrayCoordName: [],
      map: {},
      urlOSRMNearest: '//router.project-osrm.org/nearest/v1/driving/',
      urlOSRMTrip: '//router.project-osrm.org/trip/v1/driving/',
      vectorSource: new VectorSource(),
      vectorSource2: new VectorSource(),
      styles: {
        route: new Style({
          stroke: new Stroke({
            width: 1,
            color: [0, 181, 207, 0.8]
          })
        }),
        iconPin: new Style({
          image: new Icon({
            anchor: [0, 0],
            src: Pin,
            scale: 0.1
          })
        }),

        iconTruck: new Style({
          image: new Circle({
            radius: 12,
            fill: new Fill({color: 'black'}),
            stroke: new Stroke({
              color: 'white',
              width: 2,
            }),
          }),
        }),
      },
      queryString: "",
      animationSpeed: 5,
      animating: false,
      speed: null,
      now: null,
      routeLength: 0,
      geoMarker: null,
      routeCoords: null,
      stepCounter: 1
    },
    menu: {
      e6: 1,
      coordinate: [],
      solved: false,
      result: {},
      loading: false,
      waypoints: [],
      switch_: false,
      stepCounter: 1
    }
  },
  getters: {
    fillWaypoints() {
      let counter = 0;
      this.result.trips[0].legs.forEach((leg, index) => {
        this.waypoints.push({
          id: counter++,
          name: `Güzergah-${index+1}`,
          children: [
            {
              id: counter++,
              name: leg.summary ? leg.summary : "*Bilinmiyor*",
              children: this.fillSteps(leg)
            }
          ]
        })
      })
      return this.waypoints;
    },
  },
  mutations: {},
  actions: {}
});