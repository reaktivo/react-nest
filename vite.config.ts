import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'ReactNest',
      fileName: `react-nest`
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
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
  }
})