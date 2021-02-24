import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import HelloWorld from "./components/HelloWorld";
import Tasks from "./components/Tasks";
import User from "./components/User";
import NotFound from "./components/NotFound";



Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
  mode: "history",
  routes: [
    {path: "/", component: HelloWorld},
    {path: "/tasks", component: Tasks},
    {path: "/user/:id", component: User},
    {path: "*", component: NotFound}
  ]
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
