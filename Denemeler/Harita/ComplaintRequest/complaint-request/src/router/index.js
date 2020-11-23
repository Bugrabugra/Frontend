import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import Login from "../components/Login";
import jwt from "jsonwebtoken";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: "/citizen",
    name: "Citizen",
    component: () => import(/* webpackChunkName: "contact" */ "../components/Citizen"),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/clerk",
    name: "Clerk",
    component: () => import(/* webpackChunkName: "contact" */ "../components/Clerk"),
    props: true,
    meta: {
      requiresClerkAuth: true
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import(/* webpackChunkName: "contact" */ "../components/Admin"),
    props: true,
    meta: {
      requiresAdminAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    jwt.verify(store.state.token, "citizen", (error, decoded) => {
      if (decoded) {
        next();
        return
      } else {
        next("/");
      }
    })
  } else if (to.matched.some(record => record.meta.requiresClerkAuth)) {
    jwt.verify(store.state.token, "clerk", (error, decoded) => {
      if (decoded) {
        next();
        return
      } else {
        next("/");
      }
    })
  } else if (to.matched.some(record => record.meta.requiresAdminAuth)) {
    jwt.verify(store.state.token, "admin", (error, decoded) => {
      if (decoded) {
        next();
        return
      } else {
        next("/");
      }
    })
  }
  next();
})

export default router
