import path from 'path';
import { defineConfig } from 'vite';
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
	plugins: []
};

export default defineConfig(config);
