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
		target: 'es2022',
		rollupOptions: {
			external: [
				'@urql/core',
				'@urql/exchange-persisted',
				'@urql/exchange-retry'
			],
			output: {
				globals: {
					'@urql/core': 'Urql',
					'@urql/exchange-persisted': 'UrqlExchangePersisted',
					'@urql/exchange-retry': 'UrqlExchangeRetry'
				}
			}
		}
	},
	plugins: []
};

export default defineConfig(config);
