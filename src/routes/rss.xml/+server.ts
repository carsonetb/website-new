export const prerender = true; // Tells SvelteKit to bake this into a static file

export async function GET() {
	const paths = import.meta.glob('/src/posts/*.md', { eager: true });
	const posts = [];

	for (const path in paths) {
		const file = paths[path] as Record<string, any>;
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Record<string, string>;
			posts.push({ ...metadata, slug });
		}
	}

	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	const siteTitle = 'Carson Bates (carsonetb) - Blog';
	const siteUrl = 'https://carsonetb.com';
	const siteDescription = 'Where I write my opinions on things, mainly technology.';

	const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <title>${siteTitle}</title>
    <link>${siteUrl}</link>
    <description>${siteDescription}</description>
    ${posts
			.map(
				(post) => `
    <item>
        <title>${post.title}</title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description>${post.description}</description>
    </item>`
			)
			.join('')}
</channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		}
	});
}
