import { createRouter, createWebHistory } from 'vue-router'
import Hello from "../Hello";
import Posts from "../Posts";
import Post from "../Post";


const routes = [
  {
    name: "Hello",
    path: "/hello",
    component: Hello
  },
  {
    name: "Posts",
    path: "/posts",
    component: Posts,
    children: [
      {
        name: "Post",
        path: ":id",
        component: Post
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
