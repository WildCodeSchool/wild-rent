import { defineConfig } from "vitest/config"; // Utilise Vitest et non Vite
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  server: {
    allowedHosts: true,
    host: "0.0.0.0",
    hmr: { path: "/hmr" },
    watch: { usePolling: true },
  },
});
