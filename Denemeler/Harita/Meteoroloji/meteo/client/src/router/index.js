import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Login from "../views/Login.vue";
import store from "../store";


const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  {
    name: "Admin",
    path: "/admin",
    component: Admin,
    meta: {
      requireAuth: true
    }
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    meta: {
      requireAuth: false
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (to.path === "/admin") {
      if (
        store.getters["auth/getUser"] &&
        store.getters["auth/getUser"].admin
      ) {
        next();
      } else {
        next("/");
      }
    } else if (to.path === "/") {
      if (store.getters["auth/getUser"]) {
        next();
      } else {
        next("/login");
      }
    }
  } else {
    if (store.getters["auth/getUser"]) {
      next("/");
    } else {
      next();
    }
  }
})

export default router;