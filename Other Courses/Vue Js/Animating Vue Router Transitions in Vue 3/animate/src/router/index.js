import {createRouter, createWebHistory} from "vue-router";
import Home from "../components/Home.vue";
import Guide from "../components/Guide.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      meta: {
        enterClass: "animate__animated animate__fadeInLeft",
        leaveClass: "animate__animated animate__fadeOutRight"
      }
    },
    {
      name: "Guide",
      path: "/guide",
      component: Guide,
      meta: {
        enterClass: "animate__animated animate__fadeInRight",
        leaveClass: "animate__animated animate__fadeOutLeft"
      }
    }
  ]
});

export default router;
