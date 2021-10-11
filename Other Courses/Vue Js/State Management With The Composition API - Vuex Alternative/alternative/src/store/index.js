import {reactive} from "vue";

const state = reactive({
  count: 10,
  color: "blue"
});

const mutations = {
  increase() {
    state.count++;
  },
  decrease() {
    state.count--;
  },
  setColor(value) {
    state.color = value;
  }
};

const getters = {
  tripleCount() {
    return state.count * 3;
  }
}

export default {
  state,
  mutations,
  getters
};