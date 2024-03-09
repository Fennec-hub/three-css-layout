import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      script: {
        propsDestructure: true,
      },
    }),
  ],
  root: "./app",
  build: {
    outDir: "../page",
  },
  server: {
    open: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "app/src"),
      "@lib": resolve(__dirname, "lib"),
    },
  },
});
