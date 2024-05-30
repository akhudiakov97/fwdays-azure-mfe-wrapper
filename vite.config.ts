import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    federation({
      name: "wrapper-app",
      remotes: {
        watchlist: "https://mfe-wishlist.vercel.app/assets/watchlistRemoteEntry.js",
        movies: "https://mfe-movies.vercel.app/assets/moviesRemoteEntry.js",
      },
      shared: ["react", "react-dom", "zustand", "axios"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
