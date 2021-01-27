import Vue from "vue";
import {uid, Notify} from "quasar";
import {firebaseAuth, firebaseDb} from "boot/firebase";
import {showErrorMessage} from "src/functions/function-show-error-message";


const state = {
  tasks: {
    // "ID1": {
    //   name: "Go to shop",
    //   completed: false,
    //   dueDate: "2019/05/12",
    //   dueTime: "18:30"
    // },
    // "ID2": {
    //   name: "Get bananas",
    //   completed: false,
    //   dueDate: "2019/05/13",
    //   dueTime: "14:00"
    // },
    // "ID3": {
    //   name: "Get apples",
    //   completed: false,
    //   dueDate: "2019/05/14",
    //   dueTime: "16:00"
    // }
  },

  search: "",
  sort: "name",
  tasksDownloaded: false
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

  clearTasks(state) {
    state.tasks = {};
  },

  setSearch(state, value) {
    state.search = value;
  },

  setSort(state, value) {
    state.sort = value;
  },

  setTasksDownloaded(state, value) {
    state.tasksDownloaded = value;
  }
}

const actions = {
  updateTask({dispatch}, payload) {
    dispatch("fbUpdateTask", payload);
  },

  deleteTask({dispatch}, id) {
    dispatch("fbDeleteTask", id);
  },

  addTask({dispatch}, task) {
    let taskId = uid();
    let payload = {
      id: taskId,
      task: task
    }
    dispatch("fbAddTask", payload);
  },

  setSearch({commit}, value) {
    commit("setSearch", value);
  },

  setSort({commit}, value) {
    commit("setSort", value);
  },

  fbReadData({commit}) {
    let userId = firebaseAuth.currentUser.uid;
    let userTasks = firebaseDb.ref("tasks/" + userId);

    // Initial check for the data
    userTasks
      .once("value", () => {
      commit("setTasksDownloaded", true);
    }).catch(error => showErrorMessage(error.message))

    // Child added
    userTasks.on("child_added", snapshot => {
      let task = snapshot.val();
      let payload = {
        id: snapshot.key,
        task: task
      }
      commit("addTask", payload);
    })

    // Child changed
    userTasks.on("child_changed", snapshot => {
      let task = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: task
      }
      commit("updateTask", payload);
    })

    // Child removed
    userTasks.on("child_removed", snapshot => {
      let taskId = snapshot.key;

      commit("deleteTask", taskId);
    })
  },

  fbAddTask({}, payload) {
    let userId = firebaseAuth.currentUser.uid;
    let taskRef = firebaseDb.ref("tasks/" + userId + "/" + payload.id);

    taskRef
      .set(payload.task)
      .then(() => {Notify.create("Task added!")})
      .catch(error => showErrorMessage(error.message))
  },

  fbUpdateTask({}, payload) {
    let userId = firebaseAuth.currentUser.uid;
    let taskRef = firebaseDb.ref("tasks/" + userId + "/" + payload.id);

    taskRef
      .update(payload.updates)
      .then(() => {
        let keys = Object.keys(payload.updates);

        if (!(keys.includes("completed") && keys.length === 1)) {
          Notify.create("Task updated!")
        }
      })
      .catch(error => showErrorMessage(error.message))
  },

  fbDeleteTask({}, taskId) {
    let userId = firebaseAuth.currentUser.uid;
    let taskRef = firebaseDb.ref("tasks/" + userId + "/" + taskId);

    taskRef
      .remove()
      .then(() => {Notify.create("Task deleted!")})
      .catch(error => showErrorMessage(error.message))
  }
}

const getters = {
  tasksSorted(state) {
    let tasksSorted = {};
    let keysOrdered = Object.keys(state.tasks);

    if (Object.keys(state.tasks).length) {
      keysOrdered.sort((a, b) => {
        const taskAProp = state.tasks[a] && state.tasks[a][state.sort] ? state.tasks[a][state.sort].toLowerCase() : '';
        const taskBProp = state.tasks[b] && state.tasks[b][state.sort] ? state.tasks[b][state.sort].toLowerCase() : '';
        if (taskAProp > taskBProp) return 1
        else if (taskAProp < taskBProp) return -1
        else return 0
      })

      keysOrdered.forEach(key => {
        tasksSorted[key] = state.tasks[key];
      })
    }

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
