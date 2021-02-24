import shop from "../../api/shop";


export default {
  namespaced: true,
  state: {
    // = data
    items: []
  },

  getters: {
    // = computed properties
    availableProducts(state, getters) {
      return state.items.filter(product => {
        return product.inventory > 0;
      })
    },

    productIsInStock() {
      return (product) => {
        return product.inventory > 0;
      }
    }
  },

  mutations: {
    // = actions call the mutations,
    // should be simple to change the state, first argument should be state
    // Update products
    setProducts(state, products) {
      state.items = products;
    },

    decrementProductInventory(state, product) {
      product.inventory--;
    }
  },

  actions: {
    fetchProducts({commit}) {
      return new Promise((resolve, reject) => {
        // Make the call
        // Call setProducts mutation
        shop.getProducts(products => {
          // Use a mutation when to update the state
          commit("setProducts", products);
          resolve();
        })
      })
    }
  }
}
