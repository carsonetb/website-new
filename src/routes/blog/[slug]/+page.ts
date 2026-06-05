export async function load({ params }) {
	try {
		// Dynamically import the markdown file based on the URL slug
		const post = await import(`../../../posts/${params.slug}.md`);

		return {
			content: post.default, // The actual compiled markdown HTML
			meta: post.metadata // The YAML frontmatter data
		};
	} catch (e) {
		// If the file isn't found, SvelteKit will show your 404 page
		throw new Error(`Could not find ${params.slug}.md`);
	}
}
