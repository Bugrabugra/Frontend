import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from "../Header";
import Home from "../components/Home";

const User = resolve => {
  require.ensure(["../components/user/User.vue"], () => {
    resolve(require("../components/user/User.vue"))
  })
}

const UserStart = resolve => {
  require.ensure(["../components/user/UserStart.vue"], () => {
    resolve(require("../components/user/UserStart.vue"))
  })
}

const UserEdit = resolve => {
  require.ensure(["../components/user/UserEdit.vue"], () => {
    resolve(require("../components/user/UserEdit.vue"))
  })
}

const UserDetail = resolve => {
  require.ensure(["../components/user/UserDetail.vue"], () => {
    resolve(require("../components/user/UserDetail.vue"))
  })
}

Vue.use(VueRouter)

const routes = [
  {
    path: "",
    name: "Home",
    components: {
      default: Home,
      "HeaderTop": Header
    }
  },
  {
    path: "/user",
    component: User,
    components: {
      default: User,
      "HeaderBottom": Header
    },
    children: [
      {path: "", component: UserStart},
      {
        path: ":id",
        component: UserDetail,
        beforeEnter: (to, from, next) => {
          console.log("inside route setup");
          next();
        }},
      {path: ":id/edit", component: UserEdit, name: "UserEdit"}
    ]
  },
  {path: "*", redirect: "/"}
]

const router = new VueRouter({
  scrollBehavior(to, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {selector: to.hash};
    }
    return {x: 0, y: 0};
  },
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router