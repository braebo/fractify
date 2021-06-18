<script>
	import { toggleTheme, initTheme } from '$lib/theme/utils'
	import { fly } from 'svelte/transition'
	import SunMoon from './SunMoon.svelte'
	import { onMount } from 'svelte'

	onMount(() => initTheme())
</script>


<template lang='pug'>

	.switch-container
		
		.switch(on:click='{toggleTheme}')
			slot
				SunMoon

</template>

<style>
	.switch {
		position: relative;
		width: 50px;
		height: 50px;
	}
	.switch-container {
		position: absolute;
		right: 0;
		top: 0;
	}
</style>