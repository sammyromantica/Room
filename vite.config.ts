import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  base: "/Room/",
  plugins: [
    viteTsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      ssr: false,
      static: true,  // <--- Esto genera el index.html estático
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-dom/client", "react/jsx-runtime", "react/jsx-dev-runtime"],
    ignoreOutdatedRequests: true,
  },
  build: {
    rollupOptions: {
      output: {
        generatedCode: {
          constBindings: true,
          arrowFunctions: true,
        },
      },
    },
  },
  esbuild: {
    minifyIdentifiers: false,
    minifySyntax: false,
    minifyWhitespace: false,
  },
});