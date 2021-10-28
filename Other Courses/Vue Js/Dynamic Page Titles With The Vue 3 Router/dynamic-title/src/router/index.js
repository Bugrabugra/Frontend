import {createRouter, createWebHistory, onBeforeRouteUpdate} from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home"
    }
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "About"
    }
  }
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
})

export default router;