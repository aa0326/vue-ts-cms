import { createRouter, createWebHashHistory } from "vue-router";
import { RouteRecordRaw } from "vue-router";
import localCache from "@/utils/cache";
import { firstMenu } from "@/utils/map-menus";
const login = () => import("@/views/login/login.vue");
const main = () => import("@/views/main/main.vue");
const NotFound = () => import("@/views/not-found/not-found.vue");
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/main",
    name: "main",
    component: main
  },
  {
    path: "/:patchMatch(.*)*",
    name: "not-found",
    component: NotFound
  }
];
const router = createRouter({
  routes,
  history: createWebHashHistory()
});
router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = localCache.getCache("token");
    if (!token) {
      return "/login";
    }
  }
  if (to.path === "/main" || to.path === "/main/") return firstMenu.url;
});
export default router;
