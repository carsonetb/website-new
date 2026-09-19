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
			a more serious font, Times New Roman (or possibly your default serif font). At first, I
			expected to write mostly programming-related things in here, but over time I've found that it
			is much more interesting to write about philosophy and politics. Please read what I write with
			scrutiny, and I hope that even if I don't convince you of my opinions, I have at least made
			you think about them.
		</p>

		<p class="text-justify font-serious text-2xl leading-12">
			Please email me with feedback, criticism, or any thoughts you might have! I tend to make
			errors in my writing and don't really like to spend much time proof-reading, so please correct
			me if you find any.
		</p>
	</div>

	<div class="ml-10 xl:overflow-y-auto">
		{#each data.posts as post (post)}
			<div class="my-10 flex h-min flex-col rounded-2xl bg-foreground p-10">
				<a href={`/blog/${post.slug}`} class="">
					<h2 class="mb-2 font-serious text-4xl text-standard">{post.title}</h2>
					<p class="-mb-1 ml-7 font-serious text-2xl text-comments italic">{post.date}</p>
					<p class="-mb-0.5 ml-7 font-serious text-2xl text-comments">{post.description}</p>
				</a>
			</div>
		{/each}
	</div>
</div>
