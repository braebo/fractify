<script>
	import { url, isActive, layout } from '@roxi/routify'
	export let items = $layout.children
	export let maxDepth = Infinity
	export let _depth = 0
	export let expand = 'selected' // 'selected', 'all' or false

	_depth++

	$: getClass = (path) => ($isActive(path) ? 'active' : '')

	$: shouldExpand = (path) => (expand === 'selected' && $isActive(path)) || expand === 'all'
</script>

<template lang='pug'>

	ul
		+each('items as { path, title, children, ...rest }')
			
			li(data-nav-depth='{_depth}')

				a(href!='{$url(path)}' class!='{getClass(path)}') {title}

				+if('items && _depth < maxDepth && shouldExpand(path)')

					svelte:self(items='{children}' '{maxDepth}' '{_depth}')

</template>

<style>
	.active {
		font-weight: bold;
	}
	ul {
		margin-left: 0;
		padding: 0;
	}
	li {
		margin-left: 12px;
		list-style: none;
		padding: 0;
	}
	a {
		text-transform: capitalize;
		font-size: 1.5rem;
		font-family: var(--font-primary);
	}
</style>
