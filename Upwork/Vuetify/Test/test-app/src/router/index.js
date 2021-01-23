import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "../components/Layout";
import View1 from "../views/View1";
import View2 from "../views/View2";
import View3 from "../views/View3";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {path: "view1", name: "View1", component: View1},
      {path: "view2", name: "View2", component: View2},
      {path: "view3", name: "View3", component: View3}
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
