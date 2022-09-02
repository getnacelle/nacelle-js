import path from 'path';
import { defineConfig, UserConfig } from 'vite';

// https://vitejs.dev/config/
export const config: UserConfig = {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src', 'client', 'index.ts'),
      fileName: 'nacelle-shopify-cart',
      formats: ['es', 'umd', 'iife'],
      name: 'NacelleShopifyCart'
    },
    sourcemap: true,
    target: 'es2018'
  },
  plugins: []
};

export default defineConfig(config);
