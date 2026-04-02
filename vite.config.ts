import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'ui': ['framer-motion', 'react-icons'],
        }
      }
    },
    // Compress assets
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      }
    },
    // Optimize CSS
    cssCodeSplit: true,
    cssMinify: true,
  },
  // Optimize images
  assetsInclude: ['**/*.png', '**/*.webp', '**/*.jpg', '**/*.jpeg'],
})
