<script>
	import { toggleTheme } from '$lib/theme/utils'
	import { fly } from 'svelte/transition'
	import SunMoon from './SunMoon.svelte'
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

		z-index: 50;
	}
	.switch-container {
		position: absolute;
		right: 0;
		top: 0;
	}
</style>