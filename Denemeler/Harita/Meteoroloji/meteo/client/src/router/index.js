import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Home",
      path: "/",
      component: Home
    },
    {
      name: "Admin",
      path: "/admin",
      component: Admin
    }
  ]
})