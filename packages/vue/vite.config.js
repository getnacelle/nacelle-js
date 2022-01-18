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
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      fileName: (format) => `nacelle-vue.${format}.js`,
      formats: ['es', 'umd', 'iife'],
      name: 'NacelleVue'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue-demi', '@nacelle/client-js-sdk'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          'vue-demi': 'VueDemi',
          '@vue/composition-api': 'CompositionApi',
          '@nacelle/client-js-sdk': 'NacelleClient'
        }
      }
    },
    target: 'es2015'
  }
};

export default defineConfig(config);
