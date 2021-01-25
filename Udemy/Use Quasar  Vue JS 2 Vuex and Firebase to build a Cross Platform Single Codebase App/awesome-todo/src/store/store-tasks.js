import Vue from "vue";
import {uid} from "quasar";


const state = {
  tasks: {
    "ID1": {
      name: "Go to shop",
      completed: false,
      dueDate: "2019/05/12",
      dueTime: "18:30"
    },
    "ID2": {
      name: "Get bananas",
      completed: false,
      dueDate: "2019/05/13",
      dueTime: "14:00"
    },
    "ID3": {
      name: "Get apples",
      completed: false,
      dueDate: "2019/05/14",
      dueTime: "16:00"
    }
  },

  search: "",
  sort: "dueDate"
}

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  },

  deleteTask(state, id) {
    Vue.delete(state.tasks, id);
  },

  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  },

  setSearch(state, value) {
    state.search = value;
  },

  setSort(state, value) {
    state.sort = value;
  }
}

const actions = {
  updateTask({commit}, payload) {
    commit("updateTask", payload);
  },

  deleteTask({commit}, id) {
    commit("deleteTask", id);
  },

  addTask({commit}, task) {
    let taskId = uid();
    let payload = {
      id: taskId,
      task: task
    }
    commit("addTask", payload);
  },

  setSearch({commit}, value) {
    commit("setSearch", value);
  },

  setSort({commit}, value) {
    commit("setSort", value);
  },
}

const getters = {
  tasksSorted(state) {
    let tasksSorted = {};
    let keysOrdered = Object.keys(state.tasks);

    keysOrdered.sort((a, b) => {
      let taskAProp = state.tasks[a][state.sort].toLowerCase();
      let taskBProp = state.tasks[b][state.sort].toLowerCase();

      if (taskAProp > taskBProp) return 1
      else if (taskAProp < taskBProp) return -1
      else return 0
    })

    keysOrdered.forEach(key => {
      tasksSorted[key] = state.tasks[key];
    })

    return tasksSorted;
  },

  tasksFiltered(state, getters) {
    let tasksSorted = getters.tasksSorted;
    let tasksFiltered = {};

    if (state.search) {
      Object.keys(tasksSorted).forEach(key => {
        let task = tasksSorted[key];
        let taskNameLowerCase = task.name.toLowerCase();
        let searchLowerCase = state.search.toLowerCase();

        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task
        }
      })
      return tasksFiltered;
    }
    return tasksSorted;
  },

  tasksTodo(state, getters) {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};

    Object.keys(tasksFiltered).forEach(key => {
      let task = tasksFiltered[key];
      if (!task.completed) {
        tasks[key] = task;
      }
    })
    return tasks;
  },

  tasksCompleted(state, getters) {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};

    Object.keys(tasksFiltered).forEach(key => {
      let task = tasksFiltered[key];
      if (task.completed) {
        tasks[key] = task;
      }
    })
    return tasks;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
