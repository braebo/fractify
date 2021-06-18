<script>
	import Themer from '$lib/components/Navbar/Themer/index.svelte'
	import Bar from '$lib/components/Navbar/Bar.svelte'
	import Lang from '$lib/components/Lang.svelte'

	let closed = false;
</script>

<template lang="pug">

	#app
		Themer
		aside(class:closed)
			Lang
			Bar

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
		padding: 16px;
		/* box-shadow: 0 0 16px rgba(0, 0, 0, 0.2); */
		height: 100%;
		position: fixed;
	}
	aside.closed {
		transform: translateX(100%);
	}
</style>
