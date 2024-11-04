import { type Plugin, mergeConfig } from 'vite'
import dts from 'vite-plugin-dts'
import base from './vite.preview.config'

const genStub: Plugin = {
  name: 'gen-stub',
  apply: 'build',
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'ssr-stub.js',
      source: 'module.exports = {}'
    })
  }
}

export default mergeConfig(base, {
  plugins: [
    dts({
      rollupTypes: true
    }),
    genStub
  ],
  optimizeDeps: {
    // avoid late discovered deps
    include: ['typescript', 'monaco-editor-core/esm/vs/editor/editor.worker', 'vue/server-renderer']
  },
  base: './',
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: () => 'vue-repl.js'
    },
    rollupOptions: {
      external: ['vue', 'vue/compiler-sfc']
    }
  }
})
