<script>
	import NavBar from '$lib/components/Navbar/Bar.svelte';

	import Lang from '$lib/components/Lang.svelte';
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
		grid-template-columns: 196px auto;
		height: 100%;
		width: 100%;
		position: absolute;
	}
	main {
		padding-top: 64px;
	}
	aside {
		padding: 16px;
		box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
		height: 100%;
	}
</style>
