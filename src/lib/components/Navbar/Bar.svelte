<script lang="ts">
	import Navigation from '$lib/components/Navbar/Navigation.svelte'
	import Themer from '$lib/components/Themer/Themer.svelte'
	import { url } from '@roxi/routify'
	export let children: ClientNodeApi[]
</script>

<nav>
	<a href={$url('/')}> <h3>My App</h3> </a>
	<Navigation items={children} />
</nav>

<div class="themer">
	<Themer />
</div>
