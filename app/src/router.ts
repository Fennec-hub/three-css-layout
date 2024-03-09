import { createRouter, createWebHashHistory } from "vue-router";

export const router = createRouter({
  history: createWebHashHistory("/three-css-layout"),
  routes: [
    {
      path: "/",
      component: () => import("./components/demo1/Index.vue"),
    },
    {
      path: "/demo2",
      component: () => import("./components/demo2/Index.vue"),
    },
    {
      path: "/demo3",
      component: () => import("./components/demo3/Index.vue"),
    },
  ],
});
