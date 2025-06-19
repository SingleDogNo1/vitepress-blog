import path from "path";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "src/Mermaid.vue",
          dest: "./",
        },
        {
          src: "src/mermaid.ts",
          dest: "./",
        },
      ],
    }),
    dts(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "MermaidPlugin",
      fileName: (format: string) =>
        format == "es"
          ? `vitepress-plugin-mermaid.${format}.mjs`
          : `vitepress-plugin-mermaid.${format}.js`,
    },
    rollupOptions: {
      external: [
        "vue",
      ],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});