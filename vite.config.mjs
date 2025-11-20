// vite.config.mjs
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {}
  },
  // Force Vite to disable native Rollup binaries
  experimental: {
    disableRollupNative: true
  }
})
