import {createStore} from "vuex";
import axios from "axios";


const store = createStore({
  state: {
    layers: [
      {name: "Mahalle", value: "mahalle"},
      {name: "Bina", value: "bina"}
    ]
  },
  getters: {},
  mutations: {},
  actions: {}
});

export default store;