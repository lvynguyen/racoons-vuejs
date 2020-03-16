import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";
import App from "./App.vue"

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      name: "app",
      path: "/",
      component: App,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "home",
      path: "/home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "login",
      path: "/login",
      component: Login
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isLoginPage = from.path.toString().includes("login");
  if (requiresAuth) {
    if (localStorage.getItem("token")) {
      next("home");
      return;
    } else if (!isLoginPage) {
      next("login");
    }
  } else {
    next();
  }
});

export default router;
