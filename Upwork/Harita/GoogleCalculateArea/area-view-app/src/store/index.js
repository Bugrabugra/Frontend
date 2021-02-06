import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import axios from "axios";

export default new Vuex.Store({
  state: {
    map: null,
    data: "",
    drawPolygon: false,
    drawingManager: null,
    saveAreaDialog: false,
    showReportDialog: false,
    polygonName: null,
    polygonGeometry: null,
    polygons: [],
    location: null,
    longAddress: null,
    totalArea: null,
    customerName: null,
    customerPhone: null,
    customerEmail: null
  },

  mutations: {
    setMap(state, payload) {
      state.map = payload;
    },

    updateData(state, payload) {
      state.data = payload;
    },

    drawPolygons(state) {
      state.map.data.forEach(feature => {
        // If you want, check here for some constraints.
        state.map.data.remove(feature);
      });

      state.polygons.forEach(polygon => {
        const polygonGeometry = window.google.maps.geometry.encoding.decodePath(polygon.geometry)
        const polygonFeature = new window.google.maps.Data.Polygon([polygonGeometry]);

        state.map.data.add({geometry: polygonFeature})
      })
    },

    zoomPolygon(state, payload) {
      let bounds = new window.google.maps.LatLngBounds;
      const geometry = window.google.maps.geometry.encoding.decodePath(payload);

      geometry.forEach(function(latLng) {
        bounds.extend(latLng);
      });

      state.map.fitBounds(bounds)
    },
  },

  actions: {
    setMap({commit}, payload) {
      commit("setMap", payload);
    },

    updateData({commit}, payload) {
      commit("updateData", payload);
    },

    drawPolygons({commit}) {
      commit("drawPolygons");
    },

    zoomPolygon({commit}, payload) {
      commit("zoomPolygon", payload);
    }
  }
})
