import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://mern-machine-test-api-psi.vercel.app', // Backend URL
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
