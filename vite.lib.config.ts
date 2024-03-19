import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  build: {
    minify: "terser",
    lib: {
      entry: "./lib",
      name: "ThreeCSSLayout",
    },
    rollupOptions: {
      external: ["three"],
      output: {
        globals: { three: "THREE" },
      },
    },
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
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    terser({
      format: {
        comments: false,
      },

      mangle: {
        keep_classnames: false,
        reserved: [],
      },
    }),
  ],
});
