import {createStore} from "vuex";


const store = createStore({
  state: {
    query: null
  },
  getters: {

  },
  mutations: {
    updateQuery(state, newQueryPart) {
      if (state.query !== null) {
        console.log("aaa")
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
    }
  },
  actions: {

  }
});

export default store;