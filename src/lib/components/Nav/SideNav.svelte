<script>
	import { hoverState } from './hoverStore';
	import { layout, url, page } from '@roxi/routify';
	import * as Icons from './icons';
	import { fade } from 'svelte/transition';

	const handle_toggle = (e) => {
		$hoverState = {
			item: e.detail.item,
			hovering: e.detail.hovering,
		};
	};
</script>

{#if $page.path == '/learn/index'}
	<div class="section-container">
		{#each $layout.children as category}
			<span style="--color: {category.meta.color}">
				{#if $hoverState.item == category.title.toUpperCase() && $hoverState.hovering}
					<div
						transition:fade
						class="backdrop-container"
						style="background-image: linear-gradient(
											to left,
											rgb(var(--color), .5) -50%,
											rgba(var(--color), 0) 35%,
											rgba(var(--color), 0) 65%,
											rgb(var(--color), .5) 150%
				);"
					/>
				{/if}
				<div class="icon-container">
					<div class="icon-wrapper">
						<a use:$url href={category.path}>
							<svelte:component
								this={Icons[category.title.toUpperCase()]}
								item={category.title.toUpperCase()}
								on:toggle={handle_toggle}
							/>
						</a>
					</div>
				</div>
			</span>
		{/each}
	</div>
{/if}

<style>
	.backdrop-container {
		pointer-events: none;
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		z-index: -1;
	}
	a {
		/* border-radius: 100px; */
		min-width: 300px;
		max-width: max-content;
		min-height: 300px;
		max-height: max-content;
	}
	.section-container {
		margin-top: 100px;
	}
	.icon-container {
		margin: auto;
		padding: 20px 50px 20px 50px;
		width: max-content;
		border-radius: 100px;
		transition: filter 0.5s;
		/* filter: saturate(0); */
	}
	/* .icon-container:hover {
		filter: saturate(1);
	} */
	.icon-wrapper {
		cursor: pointer;
	}
	/* pre {
		font-size: 10px;
	}
	h3 {
		font-family: var(--font);
	}
	:global(svg) {
		width: 200px;
		height: auto;
		margin: 0 auto;
		display: flex;
	} */
</style>
