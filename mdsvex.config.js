import autolinkHeadings from 'rehype-autolink-headings'
import github from 'remark-github'
import slug from 'rehype-slug'
import abbr from 'remark-abbr'

export default {
	extensions: ['.svelte.md', '.md', '.svx'],
	smartypants: {
		dashes: 'oldschool'
	},
	remarkPlugins: [
		[
			github,
			{
				repository: 'https://github.com/fractal-hq/fractify.git'
			}
		],
		abbr
	],
	rehypePlugins: [
		slug,
		[
			autolinkHeadings,
			{
				behavior: 'wrap'
			}
		]
	]
}
