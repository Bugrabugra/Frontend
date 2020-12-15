import Vue from "vue";
import VueRouter from "vue-router";
import EditMap from "../views/EditMap";
import ViewMap from "../views/ViewMap";


Vue.use(VueRouter)

const routes = [
  {
    path: '/edit',
    name: 'EditMap',
    component: EditMap
  },
  {
    path: '/view',
    name: 'ViewMap',
    component: ViewMap
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
