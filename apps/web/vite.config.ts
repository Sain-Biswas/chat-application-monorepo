import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ autoCodeSplitting: true, target:"react" }),
    viteReact({
      babel: {
        plugins: [["babel-plugin-react-compiler", { target: "19" }]],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@/web': resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  build: {
    outDir: "../api/public",
    emptyOutDir: true,
  },
})
