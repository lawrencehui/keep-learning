import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "favicon-64.png",
        "apple-touch-icon.png",
      ],
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff,woff2,ttf,ico}"],
        // Chapter chunks + KaTeX fonts can push individual files past the
        // default 2 MiB ceiling.
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
      },
      manifest: {
        name: "keep-learning — from numbers to quantum",
        short_name: "keep-learning",
        description:
          "A self-paced curriculum from elementary logic to quantum computing.",
        theme_color: "#121110",
        background_color: "#121110",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
  },
});
