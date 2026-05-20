<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';

	// --- TypeScript Interfaces ---
	interface GitHubFile {
		name: string;
		type: string;
		download_url: string;
	}

	interface Photo {
		src: string;
		alt: string;
	}

	const repoOwner = 'carsonetb';
	const repoName = 'website-main';
	const branch = 'main';
	const folderName = 'assets/photos';
	const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderName}`;
	const rawBaseUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}/${folderName}/`;

	let photos = $state<Photo[]>([]);
	let currentIndex = $state<number>(-1);
	let isLoading = $state<boolean>(true);
	let errorMsg = $state<string | null>(null);

	let selectedPhoto = $derived(currentIndex >= 0 ? photos[currentIndex] : null);

	onMount(async () => {
		try {
			const response = await fetch(apiUrl);
			if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

			const files: GitHubFile[] = await response.json();

			photos = files
				.filter((f) => f.type === 'file' && /\.(jpe?g|png|gif|webp)$/i.test(f.name))
				.sort((a, b) => {
					const numA = parseInt(a.name);
					const numB = parseInt(b.name);
					if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
					return a.name.localeCompare(b.name);
				})
				.map((file) => ({
					src: rawBaseUrl + file.name,
					alt: file.name
				}));
		} catch (error: any) {
			console.error('Failed to load gallery:', error);
			errorMsg = error.message;
		} finally {
			isLoading = false;
		}
	});

	function openLightbox(index: number) {
		currentIndex = index;
		document.body.style.overflow = 'hidden';
		preloadAdjacent(index);
	}

	function closeLightbox() {
		currentIndex = -1;
		document.body.style.overflow = '';
	}

	function showImageAtIndex(index: number) {
		if (photos.length === 0) return;
		// Handle wrapping around (e.g., going left from the first image takes you to the last)
		currentIndex = (index + photos.length) % photos.length;
		preloadAdjacent(currentIndex);
	}

	function preloadAdjacent(index: number) {
		const next = (index + 1) % photos.length;
		const prev = (index - 1 + photos.length) % photos.length;

		if (next !== index && typeof window !== 'undefined') {
			new Image().src = photos[next].src;
		}
		if (prev !== index && typeof window !== 'undefined') {
			new Image().src = photos[prev].src;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (currentIndex === -1) return; // Only listen if modal is open

		if (event.key === 'Escape') closeLightbox();
		else if (event.key === 'ArrowRight') showImageAtIndex(currentIndex + 1);
		else if (event.key === 'ArrowLeft') showImageAtIndex(currentIndex - 1);
	}

	$effect(() => {
		return () => {
			if (typeof document !== 'undefined') document.body.style.overflow = '';
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="min-h-screen bg-background p-8 font-serif text-standard">
	<header class="mb-12 space-y-2 text-center">
		<h1 class="font-mono text-5xl text-classes">Photography</h1>
		<a href={resolve('/')} class="font-mono text-2xl text-link">[back]</a>
	</header>

	<main class="mx-auto max-w-7xl">
		{#if isLoading}
			<div class="flex justify-center p-12 font-mono text-keyword">
				<p>Loading photos...</p>
			</div>
		{:else if errorMsg}
			<div class="flex justify-center p-12 font-mono text-link">
				<p>Error: {errorMsg}</p>
			</div>
		{:else if photos.length === 0}
			<div class="flex justify-center p-12 font-mono text-comments">
				<p>No images found in the repository.</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each photos as photo, index (index)}
					<button
						class="group relative aspect-square cursor-pointer overflow-hidden rounded bg-foreground focus:ring-2 focus:ring-keyword focus:outline-none"
						onclick={() => openLightbox(index)}
						aria-label={`View ${photo.alt} fullscreen`}
					>
						<img
							src={photo.src}
							alt={photo.alt}
							loading="lazy"
							class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
						/>
					</button>
				{/each}
			</div>
		{/if}
	</main>

	<footer class="mt-12 text-center">
		<a href={resolve('/')} class="font-mono text-2xl text-link">[back]</a>
	</footer>

	{#if selectedPhoto}
		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
			transition:fade={{ duration: 150 }}
			onclick={closeLightbox}
			role="dialog"
			aria-modal="true"
		>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="relative flex max-h-screen max-w-[90vw] cursor-auto flex-col items-center"
				transition:scale={{ duration: 150, start: 0.95 }}
				onclick={(e) => e.stopPropagation()}
			>
				<div class="relative">
					<img
						src={selectedPhoto.src}
						alt={selectedPhoto.alt}
						class="max-h-[85vh] max-w-full rounded object-contain shadow-2xl shadow-foreground"
					/>

					<button
						class="absolute inset-y-0 left-0 w-1/3 cursor-w-resize opacity-0 focus:outline-none"
						onclick={() => showImageAtIndex(currentIndex - 1)}
						aria-label="Previous image"
					></button>
					<button
						class="absolute inset-y-0 right-0 w-1/3 cursor-e-resize opacity-0 focus:outline-none"
						onclick={() => showImageAtIndex(currentIndex + 1)}
						aria-label="Next image"
					></button>
				</div>

				<div class="mt-4 flex w-full justify-between font-mono text-sm">
					<span class="text-comments">{currentIndex + 1} / {photos.length}</span>
					<span class="text-string">{selectedPhoto.alt}</span>
					<button class="text-link hover:text-keyword focus:outline-none" onclick={closeLightbox}>
						[close]
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
