import adapter from '@sveltejs/adapter-auto';
import preprocessor from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					'~': path.resolve('./src')
				}
			}
		}
	},
	preprocess: preprocessor()
};

export default config;
