import path from 'path';
import { defineConfig } from 'vite';
import transformTaggedTemplate from 'rollup-plugin-transform-tagged-template';

// https://vitejs.dev/config/
export const config = {
  plugins: [
    transformTaggedTemplate({
      // collapse whitespace in GraphQL tag template literals (gql``)
      tagsToProcess: ['gql'],
      transformer: (data) => data.replace(/\s+/g, ' ').trim(),
      parserOptions: { sourceType: 'module' }
    })
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },
  build: {
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, 'src/client/index.ts'),
      name: 'NacelleShopifyCheckout',
      fileName: (format) => `nacelle-shopify-checkout.${format}.js`,
      formats: ['es', 'umd', 'iife']
    },
    rollupOptions: {
      treeshake: 'smallest'
    }
  }
};

export default defineConfig(config);
