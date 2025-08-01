import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  
  // Basic build settings
  build: {
    outDir: 'dist',
  },
  
  // Development server
  server: {
    port: 3000,
  },
});