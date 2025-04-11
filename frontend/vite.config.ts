import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Import path for resolving aliases

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@config': path.resolve(__dirname, 'config.ts'), // Add alias for @config
    },
  },
})