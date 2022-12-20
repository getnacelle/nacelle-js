import path from 'path';

/// <reference types="vitest" />
import { defineConfig, UserConfig } from 'vite';

// https://vitejs.dev/config/
export const config: UserConfig = {
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src', 'index.ts'),
			fileName: 'nacelle-storefront-sdk',
			formats: ['es', 'umd', 'iife'],
			name: 'NacelleStorefrontSdk'
		},
		sourcemap: true,
		target: 'es2018'
	},
	plugins: [],
	test: {
		coverage: {
			enabled: true,
			provider: 'c8',
			reportsDirectory: 'coverage',
			reporter: ['text', 'lcov']
		},
		environment: 'jsdom'
	}
};

export default defineConfig(config);
