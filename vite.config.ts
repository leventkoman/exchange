import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from "node:path";


// https://vite.dev/config/
export default defineConfig({
  root: "web",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: path.resolve(__dirname, "web/dist"),
    emptyOutDir: true
  },
  server: {
    port: 5173
  }
})
