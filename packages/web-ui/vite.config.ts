import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    // cssCodeSplit: true,
    minify: false,
    rollupOptions: {
      external: ["vue", "naive-ui"],
      input: ["index.ts"],
      output: [
        {
          dir: "dist/es",
          format: "es",
          entryFileNames: "[name].js",
          preserveModules: true,
          preserveModulesRoot: "src",
        },
        {
          format: "cjs",
          entryFileNames: "[name].js",
          preserveModules: true,
          dir: "dist/lib",
          preserveModulesRoot: "src",
        },
      ],
    },
    lib: {
      entry: "./index.ts",
      formats: ["es", "cjs"],
    },
  },
  plugins: [vue(), dts()],
});
