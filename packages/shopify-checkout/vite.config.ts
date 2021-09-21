import path from 'path';
import { defineConfig, UserConfigExport } from 'vite';

// https://vitejs.dev/config/
export const config: UserConfigExport = {
  plugins: [],
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
      fileName: (format): string => `nacelle-shopify-checkout.${format}.js`,
      formats: ['es', 'umd', 'iife']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {}
      }
    }
  }
};

export default defineConfig(config);
