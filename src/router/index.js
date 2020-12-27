import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Secret from "../views/Secret.vue";
import firebase from "firebase";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/secret",
    name: "secret",
    component: Secret,
    meta: {
      requiresAuth: true,
    },
    props: true
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  let isAuthenticated = "";
  try {
    isAuthenticated = firebase.auth().currentUser;
    console.log("isauthenticated", isAuthenticated);
  } catch (err) {
    isAuthenticated = "error";
  }
  if (requiresAuth && !isAuthenticated) {
    console.log("user not logged in");
    next("/login");
  } else {
    try {
      console.log("user is logged in ", isAuthenticated);
      
      next();

      console.log("page loaded!");
    } catch (error) {
      console.log("ERROR!", error);
    }
  }
});

export default router;
