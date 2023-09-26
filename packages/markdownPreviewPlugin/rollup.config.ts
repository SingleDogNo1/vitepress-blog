import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'

export default defineConfig([
  {
    input: './core/index.ts',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs'
      },
      {
        file: 'dist/index.mjs',
        format: 'esm'
      }
    ],

    plugins: [
      typescript({ compilerOptions: { lib: ['esnext'] }, allowSyntheticDefaultImports: true })
    ],
    watch: {
      exclude: 'node_modules/**'
    }
  }
])
