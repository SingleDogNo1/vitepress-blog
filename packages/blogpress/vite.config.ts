import { defineConfig } from 'vite'
import { VuePreviewPlugin } from '@singledog/vue-preview-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, '')
      }
    }
  },
  plugins: [VuePreviewPlugin()]
})
