// import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true, // important! enables globals like 'vi' and 'describe'
    environment: 'jsdom', // for React testing
    setupFiles: './src/setupTests.ts', // optional, your setup file
  }
})
