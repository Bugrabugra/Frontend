import Vue from 'vue'
import VueRouter from 'vue-router'
import Citizen from "../components/Citizen";
import Login from "../components/Login";


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
    component: Citizen
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
