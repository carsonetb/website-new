<script lang="ts">
	import './layout.css';

	export const prerender = true;

	let { children } = $props();
</script>

<svelte:head>
	<title>carsonetb dot com</title>
	<!-- use offline keep android open script -->
	<script src="banner.js?size=mini&hidebutton=off&v=2"></script>

	<!-- local static favicon is better than relying on github's horrendous uptime for the image -->
	<link rel="icon" href="favicon.png" />
</svelte:head>
{@render children()}
