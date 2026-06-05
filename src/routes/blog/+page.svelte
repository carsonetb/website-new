<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<div
	class="grid h-auto w-full grid-cols-1 bg-background p-5 md:p-20 xl:h-screen xl:grid-cols-2 xl:overflow-hidden"
>
	<div class="mr-10">
		<div class="mb-10 text-center">
			<a href={resolve('/')} class="font-mono text-2xl text-link">[back]</a>
			<h1 class="mt-3 font-mono text-5xl text-classes xl:text-4xl 2xl:text-5xl">Blog</h1>
			<a href={resolve('/rss.xml')} class="font-mono text-xl text-link italic underline">RSS</a>
		</div>

		<p class="text-justify font-serious text-2xl leading-12">
			This blog is for writing about some of my more serious opinions. For this reason, I've chosen
			a more serious font, Times New Roman (or possibly your default serif font). Probably, most of
			the things I will write about will be programming related, but I might choose to write about
			other things. I've chosen not to migrate posts from my old website.
		</p>
	</div>

	<div class="ml-10">
		{#each data.posts as post (post)}
			<div class="flex h-min flex-col rounded-2xl bg-foreground p-10">
				<a href={`/blog/${post.slug}`} class="">
					<h2 class="mb-2 font-serious text-4xl text-standard">{post.title}</h2>
					<p class="-mb-1 ml-7 font-serious text-2xl text-comments italic">{post.date}</p>
					<p class="-mb-0.5 ml-7 font-serious text-2xl text-comments">{post.description}</p>
				</a>
			</div>
		{/each}
	</div>
</div>
