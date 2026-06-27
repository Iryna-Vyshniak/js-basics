import { defineConfig } from 'vite';
import path, { resolve } from 'path';

export default defineConfig({
  root: './',
  publicDir: 'public',

  plugins: [],
  build: {
    outDir: 'dist', 
    assetsDir: 'assets',
    sourcemap: false, 
    target: 'es2024', 
    minify: 'terser',
    terserOptions: {
      compress: {
        pure_funcs: ['console.log'], 
        drop_debugger: true,
      },
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        "basics-data-types": resolve(__dirname, 'src/pages/basics-data-types.html'),
        "loops-conditions": resolve(__dirname, 'src/pages/loops-conditions.html')
      },
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },

  server: {
    port: 3000,
    open: true,
  },
});