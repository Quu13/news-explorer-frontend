import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/news-explorer-frontend/', // ⬅️ Use your actual GitHub repo name here
  plugins: [react()],
  server: {
    port: 3000,
  },
});