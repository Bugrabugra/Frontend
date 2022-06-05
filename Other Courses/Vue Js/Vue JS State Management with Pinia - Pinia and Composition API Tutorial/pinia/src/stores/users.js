import {v4 as uuid} from "uuid";
import { defineStore } from "pinia";

export const useUserStore = defineStore("users", {
  state: () => {
    return {
      users: []
    }
  },
  actions: {
    create(user) {
      this.users.push({
        id: uuid(),
        ...user
      })
    },
    delete(id) {
      this.users = this.users.filter(user => user.id !== id);
    }
  },
  getters: {
    usersByName(state) {
      const sortable = [...state.users];
      return sortable.sort((a, b) => a.name.localeCompare(b.name))
    }
  }
})
