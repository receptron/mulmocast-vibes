#!/usr/bin/env node

import { createServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function startVueServer() {
  const server = await createServer({
    plugins: [vue()],
    root: path.resolve(__dirname, 'client-vue'),
    server: {
      port: 5173,
      host: '0.0.0.0'
    },
    build: {
      outDir: '../dist-vue'
    },
    css: {
      postcss: path.resolve(__dirname, 'postcss.config.js')
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'client-vue/src')
      }
    }
  })

  await server.listen()
  server.printUrls()
}

startVueServer().catch(console.error)