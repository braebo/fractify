<script>
	import Themer from '$lib/components/Nav/Themer/index.svelte'
	import Nav from '$lib/components/Nav/index.svelte'

	let closed = false;
</script>

<template lang="pug">

	#app
		Themer
		//- aside(class:closed)
			Nav

		section
			main.container
				slot
			footer

</template>


<style>
	#app {
		display: flex;
		position: relative;
		max-width: 100vw;
		overflow-x: hidden;
		position: absolute;
	}
	main {
		padding-top: 64px;
	}
	aside {
		box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
		position: fixed;
		
		height: 100%;
		padding: 16px;
		display: flex;
		width: 100%;
		max-width: 500px;
		min-width: max-content;
		
		background: var(--light-a);
	}
	aside.closed {
		transform: translateX(100%);
	}
</style>
