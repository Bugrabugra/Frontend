import {createStore} from "vuex";


const store = createStore({
  state: {
    tasks: [
      {id: 0, task: "Task One", done: false},
      {id: 1, task: "Task Two", done: false},
      {id: 2, task: "Task Three", done: false}
    ]

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
});

export default store;