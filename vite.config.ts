import { VitePWA } from "vite-plugin-pwa"
import { defineConfig } from "vite"
import path from "path"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      filename: "sw.ts",
      injectManifest: { swDest: "dist/sw.js" },
      manifest: {
        name: "Scheduly",
        short_name: "Scheduly",
        description: "Manage and centralize worked hours, track time easily, and generate clear reports from a single place",
        icons: [
          {
            src: "/images/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/images/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/images/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/images/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        start_url: "/",
        display: "standalone",
        background_color: "#0DB9A4",
        theme_color: "#0DB9A4",
      },
      registerType: "autoUpdate",
      srcDir: "src",
      strategies: "injectManifest",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
