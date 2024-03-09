import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/three-css-layout/",
      component: () => import("./components/demo1/Index.vue"),
    },
    {
      path: "/three-css-layout/demo2",
      component: () => import("./components/demo2/Index.vue"),
    },
    {
      path: "/three-css-layout/demo3",
      component: () => import("./components/demo3/Index.vue"),
    },
  ],
});
