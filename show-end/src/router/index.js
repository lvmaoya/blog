import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/home/HomeView.vue"),
  },
  {
    path: "/work",
    name: "Work",
    component: () => import("../views/work/WorkView.vue"),
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import("../views/blog/BlogView.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/about/AboutView.vue"),
  },
  {
    path: "/detail",
    name: "Detail",
    component: () => import("../views/detail/DetailArticleView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
