import {createRouter, createWebHistory} from "vue-router";
import PhotoApp from "./PhotoApp";
import PhotoView from "./PhotoView";


export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "root",
      path: "/",
      component: PhotoApp,
      children: [
        {
          name: "photos",
          path: "/albums/:id",
          component: PhotoView
        }
      ]
    }
  ]
})