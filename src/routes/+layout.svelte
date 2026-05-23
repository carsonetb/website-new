<script lang="ts">
	import './layout.css';

	export const prerender = true;

	let { children } = $props();
</script>

<svelte:head>
	<script src="https://keepandroidopen.org/banner.js?size=minimal"></script>

	<link
		rel="icon"
		href="https://github.com/carsonetb/website-main/blob/main/assets/profile.png?raw=true"
	/></svelte:head
>
{@render children()}
