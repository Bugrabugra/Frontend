import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from "../views/Profile.vue";
import Page404 from "../views/404.vue";
import Info from "@/views/Info";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    children: [
      // profile/12/info
      {
        path: ":id",
        name: "Info",
        component: Info
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: Page404
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
