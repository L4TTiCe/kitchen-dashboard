<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Nav from '$lib/components/nav.svelte';

	const app_name = 'Kitchen Dashboard';
</script>

<svelte:head>
	<title>{app_name}</title>
</svelte:head>

<Nav />

<div class="m-8 p-8">
	<slot />
</div>

<Footer />

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
