<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();

	const Content = data.content;
</script>

<div class="h-max bg-blogbg">
	<article class="blog-content">
		<a href={resolve('/blog')} class="font-mono text-2xl text-link">[back]</a>

		<h1 class="mt-10 -mb-4">{data.meta.title}</h1>
		<p class="-mb-7 ml-5 italic">{data.meta.date}</p>
		<p class="ml-10 italic">by Carson Bates (carsonetb)</p>

		<Content />
	</article>
</div>
