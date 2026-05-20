<script lang="ts">
	let {
		title,
		language,
		description,
		url
	}: {
		title: string;
		language: string;
		description: string;
		url: string;
	} = $props();
</script>

<div class="my-10 space-y-1">
	<h3 class="font-mono text-3xl text-standard">
		<span class="text-classes">{title}</span> &#123
	</h3>
	<h4 class="ml-8 font-serif text-xl text-comments italic">
		<div class="flex items-start">
			<span>about: </span>
			<span class="ml-2 flex-1 font-mono text-string not-italic">"{description}"</span>
		</div>
	</h4>
	<h4 class="ml-8 font-serif text-xl text-comments italic">
		<div class="flex items-start">
			<span>url: </span>
			<span class="ml-2 flex-1 font-mono text-string not-italic"
				>"<a href={url} target="_blank" class="underline">{url}</a>"</span
			>
		</div>
	</h4>
	<h4 class="ml-8 font-serif text-xl text-comments italic">
		language: <span class="ml-2 font-mono text-classes not-italic">{language}</span>
	</h4>
	<h3 class="font-mono text-3xl text-standard">&#125</h3>
</div>
