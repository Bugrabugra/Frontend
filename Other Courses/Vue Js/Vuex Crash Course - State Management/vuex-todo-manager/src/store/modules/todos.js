import axios from "axios";


const state = {
  todos: [
    {
      id: 1,
      title: "Todo One"
    },
    {
      id: 2,
      title: "Todo Two"
    }
  ]
};

const getters = {
  allTodos(state) {
    return state.todos;
  }
};

const actions = {
  async fetchTodos({commit}) {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
    commit("setTodos", response.data);
  },

  async addTodo({commit}, title) {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: title,
        completed: false
      })
    commit("newTodo", response.data);
  },

  async deleteTodo({commit}, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    commit("removeTodo", id);
  },

  async filterTodos({commit}, filter) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${filter}`);
    commit("setTodos", response.data);
  },

  async updateTodo({commit}, updatedTodo) {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo);
    commit("updateTodo", response.data);
  }
};

const mutations = {
  setTodos(state, todos) {
    state.todos = todos;
  },

  newTodo(state, todo) {
    state.todos.unshift(todo);
  },

  removeTodo(state, id) {
    state.todos = state.todos.filter(todo => {
      return todo.id = id;
    })
  },

  updateTodo(state, updatedTodo) {
    const index = state.todos.findIndex(todo => {
      return todo.id === updatedTodo.id;
    });
    if (index !== -1) {
      state.todos.splice(index, 1, updatedTodo);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}