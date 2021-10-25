import {defineStore} from "pinia";


export const useCounterStore = defineStore("main", {
  state: () => ({
    counter: 0,
    name: "Erik"
  }),
  getters: {
    doubleCount(state) {
      return state.counter * 2
    }
  },
  actions: {
    reset() {
      this.counter = 0;
    },
    addOne() {
      this.counter++;
    }
  }
});