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
    uniqueValues: null,
    error: null,
    result: null
  },
  getters: {},
  mutations: {
    setLayer(state, layer) {
      state.layer = layer;
    },
    setFields(state, fields) {
      state.fields = fields;
    },
    setQuery(state, newQuery) {
      state.query = newQuery;
    },
    updateQuery(state, newQueryPart) {
      if (state.query !== null) {
        if (state.query.endsWith(" ")) {
          state.query = state.query + newQueryPart;
        } else {
          state.query = this.state.query + " " + newQueryPart;
        }
      } else {
        state.query = newQueryPart;
      }
    },
    setClickedField(state, field) {
      state.field = field;
    },
    setUniqueValues(state, values) {
      state.uniqueValues = values;
    },
    setError(state, isError) {
      state.error = isError;
    },
    setResult(state, data) {
      state.result = data;
    }
  },
  actions: {
    async getFields({state, commit}) {
      const response = await axios.get(
        "http://localhost:3001/fields",{
          params: {
            layer: state.layer
          }
        }
      );
      const data = await response.data;
      const fields = data.map(field => field.column_name);
      commit("setFields", fields);
    },
    async getUniqueValues({state, commit}) {
      const response = await axios.get(
        "http://localhost:3001/unique",
        {
          params: {
            layer: state.layer,
            field: state.field
          }
        }
      );
      const data = await response.data;
      const uniqueValues = data.map(unique => unique[state.field]);
      commit("setUniqueValues", uniqueValues)
    },
    async query({state, commit}) {
      const response = await axios.get(
        "http://localhost:3001/layer",
        {
          params: {
            layer: state.layer,
            filter: encodeURIComponent(state.query)
          }
        }
      );
      if (response.data.name === "error") {
        commit("setError", true);
      }
      const data = await response.data;
      commit("setResult", data);
      console.log(state.result);
    }
  }
});

export default store;