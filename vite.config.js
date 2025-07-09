import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // this is okay if hosted at root
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true, // important for dev reloading
  }
});
