export async function load() {
	// This tells Vite to crawl the folder and import all metadata
	const paths = import.meta.glob('/src/posts/*.md', { eager: true });

	const posts = [];

	for (const path in paths) {
		const file = paths[path] as Record<string, any>;
		// Extract the filename without the .md extension to use as the URL slug
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Record<string, string>;
			posts.push({ ...metadata, slug });
		}
	}

	// Sort posts by date (newest first)
	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return { posts };
}
