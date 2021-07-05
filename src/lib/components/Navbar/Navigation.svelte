<script lang='ts'>
	import { url, isActive, layout } from '@roxi/routify'
	export let items = $layout.children
	export let maxDepth = Infinity
	export let _depth = 0
	export let explode = 'selected' // "selected", "all" or false
	_depth++
	$: getClass = (path: string) => ($isActive(path) ? 'active' : '')
	$: shouldExplode = (path: string) => (explode === 'selected' && $isActive(path)) || explode === 'all'
</script>

<ul>
	{#each items as { path, title, children, ...rest }}
		<li data-nav-depth={_depth}>
			<a href={$url(path)} class={getClass(path)}>{title}</a>

			{#if items && _depth < maxDepth && shouldExplode(path)}
				<svelte:self items={children} {maxDepth} {_depth} />
			{/if}
		</li>
	{/each}
</ul>

<style>
	.active {
		font-weight: bold;
	}
	ul {
		padding-left: 1rem;
	}
	li {
		list-style: none;
	}
	a {
		text-transform: capitalize;
	}
</style>
