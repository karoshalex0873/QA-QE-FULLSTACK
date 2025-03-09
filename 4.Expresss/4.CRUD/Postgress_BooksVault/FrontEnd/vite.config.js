import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  root: './',
  build: {
    outDir: 'dist',
  },
  server: {
    open: true
  }
});