import { sveltePreprocess } from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import nodeAdapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		sveltePreprocess({
			postcss: true,
		}),
	],

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: process.env.NODE_BUILD ? nodeAdapter() : adapter(),
		/*csp: {
			directives: {
				'script-src': ['self'],
			},
			reportOnly: {
				'script-src': ['self'],
				'report-uri': ['/'],
			},
		},*/
	},
};

export default config;
