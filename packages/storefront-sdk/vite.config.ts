import path from 'path';

/// <reference types="vitest" />
import { defineConfig } from 'vite';
import type { UserConfig } from 'vite';

// https://vitejs.dev/config/
export const config: UserConfig = {
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src', 'index.ts'),
			fileName: 'nacelle-storefront-sdk',
			name: 'NacelleStorefrontSdk'
		},
		sourcemap: true,
		target: 'es2021'
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
