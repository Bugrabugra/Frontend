import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      {id: 1, title: "Wake up", done: false, dueDate: "2020-10-15"},
      {id: 2, title: "Get bananas", done: false, dueDate: "2020-10-16"},
      {id: 3, title: "Eat bananas", done: false, dueDate: null},
    ],

    snackbar: {
      show: false,
      text: ""
    }
  },
  mutations: {
    addTask(state, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      }
      state.tasks.push(newTask);
    },

    doneTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0];
      task.done = !task.done;
    },

    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
    },

    updateTaskTitle(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0];
      task.title = payload.title;
    },

    showSnackbar(state, text) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }

      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout)
    },

    hideSnackbar(state) {
      state.snackbar.show = false;
    },

    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0];
      task.dueDate = payload.dueDate;
    }
  },
  actions: {
    addTask(context, newTaskTitle) {
      context.commit("addTask", newTaskTitle);
      context.commit("showSnackbar", "Task added!")
    },

    deleteTask(context, id) {
      context.commit("deleteTask", id);
      context.commit("showSnackbar", "Task deleted!")
    },

    updateTaskTitle(context, payload) {
      context.commit("updateTaskTitle", payload);
      context.commit("showSnackbar", "Task updated!")
    },

    updateTaskDueDate(context, payload) {
      context.commit("updateTaskDueDate", payload);
      context.commit("showSnackbar", "Date updated!")
    },
  },
  getter: {

  },
})
