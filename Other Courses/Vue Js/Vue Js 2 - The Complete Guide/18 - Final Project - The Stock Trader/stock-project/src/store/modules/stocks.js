import stocks from "../../data/stocks";


const state = {
  stocks: []
}

const mutations = {
  "SET_STOCKS"(state, stocks) {
    state.stocks = stocks;
  },

  "RND_STOCKS"() {
    state.stocks.forEach(stock => {
      stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
    })
  },
}

const actions = {
  buyStock(context, order) {
    context.commit("BUY_STOCK", order);
  },

  initStocks(context) {
    context.commit("SET_STOCKS", stocks);
  },

  randomizeStocks(context) {
    context.commit("RND_STOCKS");
  },
}

const getters = {
  stocks(state) {
    return state.stocks;
  }
}


export default {
  state,
  mutations,
  actions,
  getters
}