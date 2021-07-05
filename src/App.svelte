<script>
  import { urlTransform } from '$lib/components/Nav/Lang.svelte'
  import { routes } from '../.routify/routes'
  import { Router } from '@roxi/routify'
  import './global.css'
</script>

<Router {routes} config={urlTransform} />

<style global>

</style>
