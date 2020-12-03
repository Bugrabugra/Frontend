import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Jobs from "../views/jobs/Jobs";
import JobDetails from "../views/jobs/JobDetails";
import NotFound from "../views/jobs/NotFound";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import("../views/About")
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: Jobs
  },
  {
    path: "/jobs/:id",
    name: "JobDetails",
    component: JobDetails,
    props: true
  },

  // Redirect
  {
    path: "/all-jobs",
    redirect: "/jobs"
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
