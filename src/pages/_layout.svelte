<script>
	import NavBar from '$lib/components/Navbar/Bar.svelte'

	import Lang from '$lib/components/Lang.svelte'
</script>

<div id="app">
	<aside>
		<div><Lang /></div>
		<NavBar />
	</aside>

	<section>
		<header />

		<main class="container">
			<slot />
		</main>

		<footer />
	</section>
</div>

<style>
	#app {
		display: grid;
		position: absolute;
		grid-template-columns: 196px auto;

		width: 100%;
		height: 100%;
	}
	main {
		padding-top: 64px;
		max-width: min(900px, 98vw);
		margin: auto;
	}
	aside {
		height: 100%;
		padding: 16px;

		box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
	}
</style>
