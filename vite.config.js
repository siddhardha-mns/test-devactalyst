import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
  },
  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    // Raise the warning threshold — we know framer-motion is large
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Stable, content-hashed filenames for long-term caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks(id) {
          // Core React runtime — tiny, cached forever
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          // Framer Motion — large, changes rarely
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion';
          }
          // Router
          if (id.includes('node_modules/react-router') || id.includes('node_modules/@remix-run')) {
            return 'vendor-router';
          }
          // Helmet
          if (id.includes('node_modules/react-helmet-async')) {
            return 'vendor-helmet';
          }
          // Anime.js — only used on Home loading screen
          if (id.includes('node_modules/animejs')) {
            return 'vendor-anime';
          }
          // Lucide icons — tree-shaken but still worth isolating
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          // Radix / CVA / clsx / tailwind-merge — UI utilities
          if (
            id.includes('node_modules/@radix-ui') ||
            id.includes('node_modules/class-variance-authority') ||
            id.includes('node_modules/clsx') ||
            id.includes('node_modules/tailwind-merge')
          ) {
            return 'vendor-ui';
          }
          // Zod — validation, used in contact form
          if (id.includes('node_modules/zod')) {
            return 'vendor-zod';
          }
        },
      },
    },
    // esbuild minification options
    esbuildOptions: {
      legalComments: 'none',
      treeShaking: true,
    },
  },
})

