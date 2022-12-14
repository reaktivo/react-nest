import * as path from 'path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'ReactNest',
      fileName: (format) => `react-nest.${format}.js`
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React'
        }
      },
      plugins: [
        typescript({
          target: 'es2020',
          rootDir: path.resolve(__dirname, 'src'),
          declaration: true,
          declarationDir: path.resolve(__dirname, 'dist'),
          exclude: [
            "**/*.test.*",
            "**/sandbox/*",
          ],
          allowSyntheticDefaultImports: false
        })
      ]
    }
  },
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  }
})