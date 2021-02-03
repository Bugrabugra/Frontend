import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    map: null,
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
    customerSurname: null,
    customerEmail: null
  },

  mutations: {
    setMap(state, payload) {
      state.map = payload;
    },

    startDraw(state) {
      state.drawPolygon = !state.drawPolygon;
    },

    setDrawingManager(state, payload) {
      state.drawingManager = payload;
    },

    showSaveAreaDialog(state, payload) {
      state.saveAreaDialog = payload;
    },

    setPolygonGeometry(state, payload) {
      state.polygonGeometry = payload;
    },

    addPolygon(state, payload) {
      console.log(payload)
      state.polygons.push(payload);
    },

    deletePolygon(state, payload) {
      const index = state.polygons.findIndex(polygon => {
        return polygon.geometry === payload;
      })
      state.polygons.splice(index, 1);
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

    setLocation(state, payload) {
      state.location = payload;
      state.map.setZoom(20);
      state.map.panTo(state.location.coordinates);

      new window.google.maps.Marker({
        position: state.location.coordinates,
        map: state.map,
        label: state.location.name,
      });
    },

    setLongAddress(state, payload) {
      state.longAddress = payload;
    },

    setTotalArea(state, payload) {
      state.totalArea = payload;
    },

    saveCustomerInfos(state, payload) {
      state.customerName = payload.customerName;
      state.customerSurname = payload.customerSurname;
      state.customerEmail = payload.customerEmail;
    },

    sendReport(state) {
      const longAddress = state.longAddress;
      const polygons = state.polygons.length;
      const totalArea = state.totalArea;
      const customerName = state.customerName;
      const customerSurname = state.customerSurname;
      const customerEmail = state.customerEmail;

      console.log({
        customerName: customerName,
        customerSurname: customerSurname,
        customerEmail: customerEmail,
        longAddress: longAddress,
        polygons: polygons,
        totalArea: totalArea
      })
    },

    showReportDialog(state, payload) {
      state.showReportDialog = payload;
    }
  },

  actions: {
    setMap({commit}, payload) {
      commit("setMap", payload);
    },

    startDraw({commit}) {
      commit("startDraw");
    },

    setDrawingManager({commit}, payload) {
      commit("setDrawingManager", payload);
    },

    showSaveAreaDialog({commit}, payload) {
      commit("showSaveAreaDialog", payload);
    },

    setPolygonGeometry({commit}, payload) {
      commit("setPolygonGeometry", payload);
    },

    addPolygon({commit}, payload) {
      commit("addPolygon", payload);
    },

    deletePolygon({commit}, payload) {
      commit("deletePolygon", payload);
    },

    drawPolygons({commit}) {
      commit("drawPolygons");
    },

    zoomPolygon({commit}, payload) {
      commit("zoomPolygon", payload);
    },

    setLocation({commit}, payload) {
      commit("setLocation", payload);
    },

    setTotalArea({commit}, payload) {
      commit("setTotalArea", payload);
    },

    setLongAddress({commit}, payload) {
      commit("setLongAddress", payload);
    },

    sendReport({commit}) {
      commit("sendReport");
    },

    showReportDialog({commit}, payload) {
      commit("showReportDialog", payload);
    },

    saveCustomerInfos({commit}, payload) {
      commit("saveCustomerInfos", payload);
    }
  }
})
