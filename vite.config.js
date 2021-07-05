import { svelte } from '@sveltejs/vite-plugin-svelte'
import autoPreprocess from 'svelte-preprocess'
import { resolve, dirname } from 'path'
import viteMainJs from 'vite-main-js'
import { mdsvex } from 'mdsvex'
import slug from 'remark-slug'

import { fileURLToPath } from 'url';
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const production = process.env.NODE_ENV === 'production'

export default {
	server: {
		port: 5000
	},
	publicDir: 'static',
	build: {
		cssCodeSplit: false
	},
	optimizeDeps: {
		exclude: ['@roxi/routify']
	},
	resolve: {
		dedupe: ['@roxi/routify'],
		alias: {
			$components: resolve(__dirname, './src/components'),
			$actions: resolve(__dirname, './src/actions'),
			$utils: resolve(__dirname, './src/utils'),
			$static: resolve(__dirname, './static'),
			$data: resolve(__dirname, './src/data'),
			$lib: resolve(__dirname, './src/lib'),
			$: resolve(__dirname, './src')
		}
	},
	plugins: [
		viteMainJs(),
		svelte({
			preprocess: [
				// @ts-ignore
				autoPreprocess({
					postcss: true
				}),
				mdsvex({
					remarkPlugins: [slug],
					extension: 'md'
				})
			],
			emitCss: true,
			hot: !production,
			extensions: ['.md', '.svelte']
		})
	]
}
