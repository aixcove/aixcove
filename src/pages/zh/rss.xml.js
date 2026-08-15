import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

/** Official language-specific feed backed by the zh Content collection. */
export async function GET(context) {
  const posts = (await getCollection('postsZh')).sort((a, b) => b.data.date.localeCompare(a.data.date));
  return rss({
    title: 'AIX Cove 中文',
    description: '精选 AI 工具目录、评测与行业分析。',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.date),
      link: `/zh/${post.id}/`,
    })),
    customData: '<language>zh-CN</language>',
  });
}
