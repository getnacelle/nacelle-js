import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { config } from './vite.config';

export default defineConfig({
  ...config,
  plugins: [
    ...config.plugins,
    visualizer({
      open: true,
      title: '[@nacelle/shopify-checkout] Bundle Visualizer',
      template: 'treemap'
    })
  ],
  build: {
    ...config.build,
    lib: {
      ...config.build.lib,
      formats: ['es']
    }
  }
});
