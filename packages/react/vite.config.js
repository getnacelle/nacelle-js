import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export const config = {
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'NacelleReact',
      fileName: (format) => `nacelle-react.${format}.js`,
      formats: ['es', 'umd', 'iife']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom', '@nacelle/client-js-sdk'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          '@nacelle/client-js-sdk': 'NacelleClient'
        }
      }
    },
    target: 'es2015'
  }
};

export default defineConfig(config);
