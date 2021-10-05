import path from 'path';
import { defineConfig } from 'vite';
import transformTaggedTemplate from 'rollup-plugin-transform-tagged-template';

// https://vitejs.dev/config/
export const config = {
  build: {
    lib: {
      entry: 'src/client/index.ts',
      fileName: (format) => `nacelle-shopify-checkout.${format}.js`,
      formats: ['es', 'umd', 'iife'],
      name: 'NacelleShopifyCheckout'
    },
    rollupOptions: {
      treeshake: 'smallest'
    },
    sourcemap: true,
    target: 'es2015'
  },
  plugins: [
    transformTaggedTemplate({
      // collapse whitespace in GraphQL tag template literals (gql``)
      tagsToProcess: ['gql'],
      transformer: (data) => data.replace(/\s+/g, ' ').trim(),
      parserOptions: { sourceType: 'module' }
    })
  ]
};

export default defineConfig(config);
