import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ListProduct from "../components/ListProduct";
import AddProduct from "../components/AddProduct";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'ListProduct',
    component: ListProduct
  },
  {
    path: '/addproduct',
    name: 'AddProduct',
    component: AddProduct
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
