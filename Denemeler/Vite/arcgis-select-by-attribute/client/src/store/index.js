import {createStore} from "vuex";
import axios from "axios";


const store = createStore({
  state: {
    layers: [
      {name: "Mahalle", value: "mahalle"},
      {name: "Bina", value: "bina"}
    ],
    layer: null,
    field: null,
    fields: null,
    query: null,
    result: null,
    uniqueValues: null,
    features: []
  },
  getters: {
    getFeatures(state) {
      return state.features;
    }
  },
  mutations: {
    updateQuery(state, newQueryPart) {
      if (state.query !== null) {
        if (state.query.endsWith(" ")) {
          state.query = state.query + newQueryPart;
        } else {
          state.query = state.query + " " + newQueryPart;
        }
      } else {
        state.query = newQueryPart;
      }
    },
    setQuery(state, newQuery) {
      state.query = newQuery;
    },
    setLayer(state, layer) {
      state.layer = layer;
    },
    setFields(state, fields) {
      state.fields = fields;
    },
    setResult(state, data) {
      state.result = data;
    },
    setClickedField(state, field) {
      state.field = field;
    },
    setUniqueValues(state, values) {
      state.uniqueValues = values;
    },
    setFeatures(state, payload) {
      state.features[payload.layerName] = payload.features;
    }
  },
  actions: {
    getFeatures({state, commit}) {
      state.layers.forEach(async (layer) => {
        const request = await axios.post(
          "http://localhost:3001/layer",
          null,
          { params: {
              layer: layer.value,
            }
          });
        const response = await request.data;
        // commit("setFeatures", {layerName: layer.value, features: response});

        const featuresArray = [];
        response.forEach(feature => {
          const geo = {
            type: "Feature",
            properties: {"party": "Republican"},
            geometry: {
              type: JSON.parse(feature.geometry).type,
              coordinates: JSON.parse(feature.geometry).coordinates
            }
          }
          featuresArray.push(geo);
        })
        commit("setFeatures", {layerName: layer.name, features: featuresArray});
      });
    },
    async query({state, commit}) {
      const request = await axios.post(
        "http://localhost:3001/layer",
        null,
        { params: {
            layer: state.layer,
            filter: state.query
          }
        });
      const response = await request.data;
      commit("setResult", response);
      console.log(state.result)
    },
    async getFields({state, commit}) {
      const request = await axios.post(
        "http://localhost:3001/fields",
        null,
        { params: {
            layer: state.layer,
          }
        });
      const response = await request.data;
      const fields = response.map(field => field.column_name);
      commit("setFields", fields);
    },
    async getUniqueValues({state, commit}) {
      const request = await axios.post(
        "http://localhost:3001/unique",
        null,
        { params: {
            layer: state.layer,
            field: state.field
          }
        });
      const response = await request.data;
      const uniqueValues = response.map(unique => unique[state.field]);
      commit("setUniqueValues", uniqueValues);
    }
  }
});

export default store;