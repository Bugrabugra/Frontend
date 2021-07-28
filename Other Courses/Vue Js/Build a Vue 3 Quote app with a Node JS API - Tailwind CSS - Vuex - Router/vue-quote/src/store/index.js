import { createStore } from 'vuex'

export default createStore({
  state: {
    quote: {},
    quotes: []
  },
  mutations: {
    getRandomQuote(state) {
      fetch("http://localhost:3000/quotes/random")
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (state.quote._id !== data._id) {
            state.quote = data;
          } else {
            this.commit("getRandomQuote");
          }
        })
    },

    getAllQuotes(state) {
      fetch("http://localhost:3000/quotes")
        .then(response => {
          return response.json();
        })
        .then(data => {
          state.quotes = data;
        })
    }
  },

  getters: {
    getSpecificQuote: state => id => {
      return state.quotes.filter(quote => quote._id === id)[0];
    }
  }
})
