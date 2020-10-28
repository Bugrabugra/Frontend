import Vue from 'vue'
import Router from 'vue-router'
import GoogleMap from "../components/home/GoogleMap";
import Signup from "../components/auth/Signup";
import ViewProfile from "../components/profile/ViewProfile";
import Login from "../components/auth/Login";
import firebase from "firebase";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'GoogleMap',
      component: GoogleMap,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/profile/:id",
      name: "ViewProfile",
      component: ViewProfile,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Check to see if route requires auth
  if (to.matched.some(rec => {
    return rec.meta.requiresAuth
  })) {
    // Check auth state of user
    let user = firebase.auth().currentUser;
    if (user) {
      // User signed in, proceed to route
      next();
    } else {
      // No user signed in, redirect to login
      next({name: "Login"})
    }
  } else {
    next();
  }
})

export default router;

