import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"


// const BACKENDURL = process.env.VITE_BACKEND_URL as string;

// https://vite.dev/config/
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
           target: "https://productivity-app-server-429hbhnu5.vercel.app/",
           changeOrigin: true,
       }
    }
  }
  
})
