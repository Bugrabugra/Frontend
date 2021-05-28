import {reactive, readonly} from "vue";


const state = reactive({
  counter: 0,
  colorCode: "red"
})

const methods = {
  increaseCounter() {
    state.counter++;
  },

  decreaseCounter() {
    state.counter--;
  },

  setColorCode(value) {
    state.colorCode = value;
  }
}

const getters = {
  counterSquared() {
    return state.counter * state.counter;
  }
}

export default {
  state: readonly(state), methods, getters
}