import {createStore} from "vuex";


const store = createStore({
  state: {
    tasks: [
      {id: 0, task: "Task One", done: false},
      {id: 1, task: "Task Two", done: false},
      {id: 2, task: "Task Three", done: true}
    ]

  },
  getters: {
    doneTasks(state) {
      return state.tasks.filter(task => task.done === true);
    }
  },
  mutations: {
    newTask(state, task) {
      state.tasks.push({
        id: state.tasks.length,
        task,
        done: false
      })
    },
    removeTask(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    toggleDone(state, id) {
      state.tasks = state.tasks.map(task => {
        if (task.id === id) {
          task.done = !task.done;
        }
        return task;
      })
    }
  },
  actions: {

  },
});

export default store;