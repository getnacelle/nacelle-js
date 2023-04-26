import path from 'path';
import { defineConfig } from 'vitest/config';
import type { UserConfig } from 'vite';

// https://vitejs.dev/config/
export const config: UserConfig = {
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src', 'index.ts'),
			fileName: 'nacelle-commerce-queries-plugin',
			name: 'NacelleStorefrontSdkPluginCommerceQueries'
		},
		sourcemap: true,
		target: 'es2022'
	},
	plugins: [],
	test: {
		coverage: {
			enabled: true,
			include: ['src/**/*.ts'],
			provider: 'c8',
			reportsDirectory: 'coverage',
			reporter: ['text', 'lcov'],
			exclude: [
				'src/types/**.ts',
				'src/graphql/documents.ts',
				'**/*.test.ts',
				'node_modules/**'
			]
		},
		environment: 'jsdom',
		typecheck: {
			include: ['**/*.test.ts']
		},
		setupFiles: ['vitest.setup.ts']
	}
};

export default defineConfig(config);
