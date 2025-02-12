import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "frontend", // Ajoute 'frontend' à la liste des hôtes autorisés
      "localhost", // Si nécessaire, ajoute aussi d'autres hôtes
      "0.0.0.0", // Pour permettre les connexions depuis n'importe quelle adresse IP
    ],
    host: "0.0.0.0",
    hmr: { path: "/hmr" },
    watch: { usePolling: true },
  },
});
