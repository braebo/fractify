<script>
	import { url } from '@roxi/routify'
	import Nav from './Nav.svelte'

	export let children;
</script>


<template lang="pug">

	nav
		a(href='/' use:$url)
			h3 Home
		
		Nav({children})

</template>
