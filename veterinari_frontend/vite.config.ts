import { defineConfig, createServer as createViteServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";
import type { Plugin } from "vite";

/**
 * Vite plugin: generates static sitemap.xml (or sitemap index) at build time.
 * Uses Vite's own SSR module loader to resolve TS + aliases.
 */
function sitemapPlugin(): Plugin {
  return {
    name: "generate-sitemap",
    apply: "build",
    enforce: "post",
    async closeBundle() {
      try {
        const vite = await createViteServer({
          server: { middlewareMode: true },
          appType: "custom",
          logLevel: "silent",
          plugins: [],
          resolve: {
            alias: { "@": path.resolve(__dirname, "./src") },
          },
        });

        const mod = await vite.ssrLoadModule("/src/lib/sitemap.ts");
        const outDir = path.resolve(__dirname, "dist");

        // Check if we need a sitemap index (> 45K URLs)
        const indexResult = mod.generateSitemapIndex?.();
        if (indexResult) {
          fs.writeFileSync(path.join(outDir, "sitemap.xml"), indexResult.index, "utf-8");
          for (const sub of indexResult.sitemaps) {
            fs.writeFileSync(path.join(outDir, sub.name), sub.xml, "utf-8");
          }
          console.log(`✓ Sitemap index generated (${indexResult.sitemaps.length} sub-sitemaps)`);
        } else {
          const xml = mod.generateSitemapXml();
          fs.writeFileSync(path.join(outDir, "sitemap.xml"), xml, "utf-8");
          const count = (xml.match(/<url>/g) || []).length;
          console.log(`✓ sitemap.xml generated (${count} URLs)`);
        }

        await vite.close();
      } catch (e) {
        console.warn("⚠ Sitemap generation failed (will use client-side fallback):", e);
      }
    },
  };
}

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  build: {
    minify: mode === "production" ? "esbuild" : false,
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-ui": ["@radix-ui/react-accordion", "@radix-ui/react-dialog", "@radix-ui/react-popover", "@radix-ui/react-tooltip", "@radix-ui/react-select", "@radix-ui/react-tabs"],
          "vendor-motion": ["framer-motion"],
          "data-clinics": ["./src/data/clinics.ts", "./src/data/csv-importer.ts"],
          "data-keywords": ["./src/data/keywords.ts"],
        },
      },
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    sitemapPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.png", "pwa-icon-192.png", "pwa-icon-512.png"],
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        navigateFallbackDenylist: [/^\/~oauth/, /^\/sitemap.*\.xml$/],
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        globIgnores: ["**/*.jpg", "sitemap*.xml"],
        runtimeCaching: [
          {
            urlPattern: /\.(?:jpg|jpeg|webp|avif)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
        ],
      },
      manifest: {
        name: "VeterinarioVicino.it — Trova il veterinario giusto",
        short_name: "VeterinarioVicino",
        description: "Trova il veterinario più adatto al tuo animale nella tua zona. Servizio gratuito in Italia.",
        theme_color: "#16a34a",
        background_color: "#fdfcfa",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        lang: "it",
        icons: [
          { src: "/pwa-icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "/pwa-icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
