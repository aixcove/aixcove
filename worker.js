// aixcove canonical-host + legacy-URL redirect worker.
// 1) www -> apex 301
// 2) old WP-style URLs (pre-Astro-migration) -> new routes, single-hop 301.
//    Sources: GSC/Bing 28d page data (dead URLs with historical impressions).
const LEGACY_REDIRECTS = {
  // GSC Page Indexing 404 sample, verified 2026-08-28 (exact legacy route)
  '/contact': '/contact-us/',
  '/contact/': '/contact-us/',
  '/zh/contact': '/zh/contact-us/',
  '/zh/contact/': '/zh/contact-us/',
  '/category/ai-tools-reviews/page/3/': '/category/ai-tools-reviews/',
  '/best-dify-alternatives-in-2026-3/': '/best-dify-alternatives-in-2026/',
  '/best-n8n-alternatives-in-2026-6-picks-by-workflow-fit/': '/best-n8n-alternatives-for-ai-workflow-automation-in-2026/',
  '/best-n8n-alternatives-in-2026-7-picks-for-ai-workflows-and-self-hosting/': '/best-n8n-alternatives-for-ai-workflow-automation-in-2026/',
  // 2026-08-19 Bing PageStats 审计补充 (旧 slug 变体 -> 现有 canonical)
  '/anythingllm-review-2026-pricing-pros-cons-and-best-alternatives-2/': '/anythingllm-review-2026-pricing-pros-cons-and-best-alternatives/',
  '/anythingllm-review-pricing-pros-cons-and-best-alternatives-2/': '/anythingllm-review-2026-pricing-pros-cons-and-best-alternatives/',
  '/best-anythingllm-alternatives-in-2026-3/': '/best-anythingllm-alternatives-in-2026-2/',
  '/best-anythingllm-alternatives-in-2026-6-picks-by-workflow-fit/': '/best-anythingllm-alternatives-in-2026-2/',
  '/best-anythingllm-alternatives-in-2026/': '/best-anythingllm-alternatives-in-2026-2/',
  '/best-dify-alternatives-in-2026-2/': '/best-dify-alternatives-in-2026/',
  '/best-dify-alternatives-in-2026-6-picks-by-workflow-fit/': '/best-dify-alternatives-in-2026/',
  // 2026-08-26 post consolidation (duplicate-intent variants -> canonical keeper, single hop)
  '/anythingllm-review-pricing-pros-cons-and-best-use-cases/': '/anythingllm-review-2026-pricing-pros-cons-and-best-alternatives/',
  '/how-to-use-anythingllm-with-ollama-for-private-document-chat/': '/anythingllm-ollama-tutorial-build-a-local-ai-chatbot-in-2026/',
  '/how-to-use-anythingllm-with-ollama-for-private-document-chat-in-2026/': '/anythingllm-ollama-tutorial-build-a-local-ai-chatbot-in-2026/',
  '/how-to-use-anythingllm-with-ollama-for-private-document-chat-in-2026-2/': '/anythingllm-ollama-tutorial-build-a-local-ai-chatbot-in-2026/',
  '/dify-review-2026-pricing-pros-cons-and-alternatives/': '/dify-review-2026-pricing-pros-cons-and-best-alternatives/',
  '/how-to-use-dify-to-build-your-first-ai-workflow/': '/how-to-use-dify-to-build-your-first-ai-workflow-in-2026/',
  '/how-to-use-dify-with-ollama-for-local-ai-workflows-in-2026/': '/how-to-use-dify-with-ollama-for-private-ai-workflows-in-2026/',
  '/dify-vs-flowise-in-2026-which-ai-workflow-builder-should-you-choose/': '/dify-vs-flowise-which-ai-workflow-builder-fits-you-in-2026/',
  '/dify-vs-flowise-which-ai-builder-fits-you-in-2026/': '/dify-vs-flowise-which-ai-workflow-builder-fits-you-in-2026/',
  '/flowise-review-2026-pricing-pros-cons-and-best-use-cases/': '/flowise-review-2026-pricing-pros-cons-and-alternatives/',
  '/how-to-use-flowise-with-ollama-for-a-local-ai-chatbot-in-2026/': '/how-to-use-flowise-with-ollama-for-a-private-rag-chatbot-in-2026/',
  '/best-n8n-alternatives-for-ai-workflow-automation-in-2026-2/': '/best-n8n-alternatives-for-ai-workflow-automation-in-2026/',
  '/best-n8n-alternatives-in-2026-7-picks-by-workflow-fit/': '/best-n8n-alternatives-for-ai-workflow-automation-in-2026/',
  '/how-to-use-n8n-for-ai-workflows-in-2026/': '/n8n-ai-agent-tutorial-build-a-practical-workflow/',
  '/best-cursor-alternatives-in-2026/': '/best-cursor-alternatives-in-2026-6-practical-picks/',
  '/best-bolt-new-alternatives-in-2026-5-practical-picks/': '/best-bolt-new-alternatives-in-2026-7-picks/',
  '/how-to-use-open-webui-with-ollama-for-a-local-ai-chatbot-in-2026/': '/how-to-use-open-webui-with-ollama-in-2026/',
  '/open-webui-vs-anythingllm-in-2026-which-self-hosted-ai-app-should-you-choose/': '/open-webui-vs-anythingllm-which-self-hosted-ai-ui-fits-you-in-2026/',
  // ... and their /zh/ twins (i18n variants of the same consolidation)
  '/zh/anythingllm-review-pricing-pros-cons-and-best-use-cases/': '/zh/anythingllm-review-2026-pricing-pros-cons-and-best-alternatives/',
  '/zh/how-to-use-anythingllm-with-ollama-for-private-document-chat/': '/zh/anythingllm-ollama-tutorial-build-a-local-ai-chatbot-in-2026/',
  '/zh/how-to-use-anythingllm-with-ollama-for-private-document-chat-in-2026/': '/zh/anythingllm-ollama-tutorial-build-a-local-ai-chatbot-in-2026/',
  '/zh/how-to-use-anythingllm-with-ollama-for-private-document-chat-in-2026-2/': '/zh/anythingllm-ollama-tutorial-build-a-local-ai-chatbot-in-2026/',
  '/zh/dify-review-2026-pricing-pros-cons-and-alternatives/': '/zh/dify-review-2026-pricing-pros-cons-and-best-alternatives/',
  '/zh/how-to-use-dify-to-build-your-first-ai-workflow/': '/zh/how-to-use-dify-to-build-your-first-ai-workflow-in-2026/',
  '/zh/how-to-use-dify-with-ollama-for-local-ai-workflows-in-2026/': '/zh/how-to-use-dify-with-ollama-for-private-ai-workflows-in-2026/',
  '/zh/dify-vs-flowise-in-2026-which-ai-workflow-builder-should-you-choose/': '/zh/dify-vs-flowise-which-ai-workflow-builder-fits-you-in-2026/',
  '/zh/dify-vs-flowise-which-ai-builder-fits-you-in-2026/': '/zh/dify-vs-flowise-which-ai-workflow-builder-fits-you-in-2026/',
  '/zh/flowise-review-2026-pricing-pros-cons-and-best-use-cases/': '/zh/flowise-review-2026-pricing-pros-cons-and-alternatives/',
  '/zh/how-to-use-flowise-with-ollama-for-a-local-ai-chatbot-in-2026/': '/zh/how-to-use-flowise-with-ollama-for-a-private-rag-chatbot-in-2026/',
  '/zh/best-n8n-alternatives-for-ai-workflow-automation-in-2026-2/': '/zh/best-n8n-alternatives-for-ai-workflow-automation-in-2026/',
  '/zh/best-n8n-alternatives-in-2026-7-picks-by-workflow-fit/': '/zh/best-n8n-alternatives-for-ai-workflow-automation-in-2026/',
  '/zh/how-to-use-n8n-for-ai-workflows-in-2026/': '/zh/n8n-ai-agent-tutorial-build-a-practical-workflow/',
  '/zh/best-cursor-alternatives-in-2026/': '/zh/best-cursor-alternatives-in-2026-6-practical-picks/',
  '/zh/best-bolt-new-alternatives-in-2026-5-practical-picks/': '/zh/best-bolt-new-alternatives-in-2026-7-picks/',
  '/zh/how-to-use-open-webui-with-ollama-for-a-local-ai-chatbot-in-2026/': '/zh/how-to-use-open-webui-with-ollama-in-2026/',
  '/zh/open-webui-vs-anythingllm-in-2026-which-self-hosted-ai-app-should-you-choose/': '/zh/open-webui-vs-anythingllm-which-self-hosted-ai-ui-fits-you-in-2026/',
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
