import path from 'path';
import { defineConfig, UserConfig } from 'vite';

// https://vitejs.dev/config/
export const config: UserConfig = {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src', 'client', 'index.ts'),
      fileName: (format) => `nacelle-shopify-cart.${format}.js`,
      formats: ['es', 'umd', 'iife'],
      name: 'NacelleShopifyCart'
    },
    rollupOptions: {
      treeshake: 'smallest',
      external: ['graphql-tag'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          'graphql-tag': 'GraphqlTag'
        }
      }
    },
    sourcemap: true,
    target: 'es2015',
    minify: 'esbuild'
  },
  plugins: []
};

export default defineConfig(config);
