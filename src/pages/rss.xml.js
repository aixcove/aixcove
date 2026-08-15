import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('posts')).sort((a, b) => b.data.date.localeCompare(a.data.date));
  return rss({
    title: 'AIX Cove',
    description: 'AI tools directory & reviews',
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: new Date(p.data.date),
      link: `/${p.id}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
