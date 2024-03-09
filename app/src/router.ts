import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("./components/demo1/Index.vue") },
    { path: "/demo2", component: () => import("./components/demo2/Index.vue") },
    { path: "/demo3", component: () => import("./components/demo3/Index.vue") },
  ],
});
