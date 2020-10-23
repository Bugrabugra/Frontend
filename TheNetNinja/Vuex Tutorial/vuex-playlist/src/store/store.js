import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true, // Mutation olmadan store'u değiştireme diyoruz.
  state: {
    products: [
      {name: "Banana Skin", price: 20},
      {name: "Shiny Star", price: 40},
      {name: "Green Shells", price: 60},
      {name: "Red Shells", price: 80}
    ]
  },
  getters: {
    saleProducts: state => {
      return state.products.map(product => {
        return {
          name: "**" + product.name + "**",
          price: product.price / 2
        }
      });
    }
  },
  mutations: {
    // Mutation içine async koyma, actions'a koy!
    reducePriceMutation: (state, payload) => {
      state.products.forEach(product => {
        product.price -= payload;
      })
    },
  },
  actions: {
    reducePriceAction: (injectee, payload) => {
      setTimeout(() => {
        injectee.commit("reducePriceMutation", payload);
      }, 2000)
    }
  }
})
