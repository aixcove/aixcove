// aixcove canonical-host + legacy-URL redirect worker.
// 1) www -> apex 301
// 2) old WP-style URLs (pre-Astro-migration) -> new routes, single-hop 301.
//    Sources: GSC/Bing 28d page data (dead URLs with historical impressions).
const LEGACY_REDIRECTS = {
  '/category/ai-tools-reviews/page/3/': '/category/ai-tools-reviews/',
  '/best-dify-alternatives-in-2026-3/': '/best-dify-alternatives-in-2026/',
  '/best-n8n-alternatives-in-2026-6-picks-by-workflow-fit/': '/best-n8n-alternatives-for-ai-workflow-automation-in-2026/',
  '/best-n8n-alternatives-in-2026-7-picks-for-ai-workflows-and-self-hosting/': '/best-n8n-alternatives-for-ai-workflow-automation-in-2026/',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname.toLowerCase() === 'www.aixcove.com') {
      url.hostname = 'aixcove.com';
      return Response.redirect(url.toString(), 301);
    }

    // normalize: collapse duplicate slashes, ALWAYS end with '/'
    // (all content routes are directory-style; asset paths are skipped below)
    const raw = url.pathname;
    if (raw.startsWith('/_astro/') || raw.includes('.') || raw.startsWith('/api/')) {
      return env.ASSETS.fetch(request);
    }
    const p = '/' + raw.split('/').filter(Boolean).join('/') + '/';

    // 1) exact legacy map
    if (LEGACY_REDIRECTS[p]) {
      return Response.redirect(new URL(LEGACY_REDIRECTS[p], url.origin).toString(), 301);
    }
    // 2) WP blog pagination: /blog/page/N/ -> Astro /blog/N/
    let m = p.match(/^\/blog\/page\/(\d+)\/$/);
    if (m) {
      const n = parseInt(m[1], 10);
      const dest = n === 1 ? '/blog/' : `/blog/${n}/`;
      return Response.redirect(new URL(dest, url.origin).toString(), 301);
    }
    // 3) WP category pagination: /category/<slug>/page/N/ -> /category/<slug>/
    //    (static build has no category pagination)
    m = p.match(/^\/category\/([a-z0-9-]+)\/page\/\d+\/$/);
    if (m) {
      return Response.redirect(new URL(`/category/${m[1]}/`, url.origin).toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
