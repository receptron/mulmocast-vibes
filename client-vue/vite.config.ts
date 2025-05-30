import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: 'client-vue',
  server: {
    port: 5173,
    host: '0.0.0.0'
  },
  build: {
    outDir: '../dist-vue'
  },
  css: {
    postcss: '../postcss.config.js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})