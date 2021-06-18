<script>
	import { url, isActive, layout } from '@roxi/routify'
	export let items = $layout.children
	export let maxDepth = Infinity
	export let _depth = 0
	export let expand = 'selected' // "selected", "all" or false

	_depth++

	$: getClass = (path) => ($isActive(path) ? 'active' : '')

	$: shouldExpand = (path) => (expand === 'selected' && $isActive(path)) || expand === 'all'
</script>


<ul>
	{#each items as { path, title, children, ...rest }}
		<li data-nav-depth={_depth}>
			
			<a href={$url(path)} class={getClass(path)}>{title}</a>

			{#if items && _depth < maxDepth && shouldExpand(path)}
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
		margin-left: 0;
	}
	li {
		margin-left: 12px;
	}
	li {
		list-style: none;
	}
	a {
		text-transform: capitalize;
	}
</style>
