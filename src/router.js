import Vue from "vue"
import VueRouter from "vue-router"
import Login from "./components/Login.vue"
import Home from "./components/Home.vue"
import NotFound from "./components/NotFound.vue"
import AlbumDetail from "./components/AlbumDetail.vue"
import {LOGIN_PATH} from "./shared/const"

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "home"
    },
    {
      name: "login",
      path: "/login",
      component: Login,
      meta: {
        requiresAuth: false
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
      name: "albumDetail",
      path: "/album/:id",
      component: AlbumDetail
    },
    {
      name: "notFound",
      path: "/404",
      component: NotFound,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "*",
      redirect: "404"
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isLoginPage = from.path.toString().includes(LOGIN_PATH);
  if (requiresAuth && !isLoginPage) {
    if (!localStorage.getItem("token")) {
      next(LOGIN_PATH);
      return;
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
