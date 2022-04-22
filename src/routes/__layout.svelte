<script lang='ts'>
    import Footer from "$lib/components/footer.svelte";
    import Nav from "$lib/components/nav.svelte";
    // import { env } from '$lib/env'

    const app_name = "Kitchen Dashboard";

    // console.log(`SERVER_URL:  ${env.SERVER_URL}`)
</script>

<svelte:head>
    <title>{app_name}</title>
</svelte:head>

<Nav/>

<div class="m-8 p-8">
    <slot/>
</div>

<Footer/>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>