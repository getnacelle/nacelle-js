import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export const config = {
  plugins: [vue()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },
  build: {
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'NacelleVue',
      fileName: format => `nacelle-vue.${format}.js`,
      formats: ['es', 'umd', 'iife']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', '@vue/composition-api', '@nacelle/client-js-sdk'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          '@vue/composition-api': 'CompositionApi',
          '@nacelle/client-js-sdk': 'NacelleClient'
        }
      }
    }
  }
};

export default defineConfig(config);
