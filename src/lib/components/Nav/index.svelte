<script>
	// import Lang from '$lib/components/Nav/Lang.svelte'
	import SideNav from '$lib/components/Nav/SideNav.svelte'
	import Links from '$lib/components/Nav/Links.svelte'
	import { url } from '@roxi/routify'

	export let children
</script>


<template lang="pug">

	nav
		//- Lang
		a(href='/' use:$url)
			h1 Home
		Links({children})
		SideNav

</template>