import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },

  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        svgoConfig: {
          plugins: [
            {
              removeViewBox: false,
            },
          ],
        },
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
});
