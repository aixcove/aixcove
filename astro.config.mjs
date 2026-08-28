import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import indexnow from 'astro-indexnow';

export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: { prefixDefaultLocale: false },
  },
  site: 'https://aixcove.com',
  trailingSlash: 'always',
  integrations: [sitemap({
    i18n: {
      defaultLocale: 'en',
      locales: { en: 'en', zh: 'zh-CN' },
    },
    // Keep noindex/search and low-value page-2+ archives out of the sitemap.
    // Pagination remains crawlable through normal internal links, but the sitemap
    // is reserved for canonical content pages and first-page archives.
    filter: (page) => {
      const pathname = new URL(page).pathname;
      const isSearch = /\/search\/?$/.test(pathname);
      const isMainPagination = /^\/(?:zh\/)?(?:blog|listings)\/[2-9]\d*\/$/.test(pathname);
      const isCategoryPagination = /^\/(?:zh\/)?(?:category|listing-category)\/[^/]+\/page\/[2-9]\d*\/$/.test(pathname);
      return !isSearch && !isMainPagination && !isCategoryPagination;
    },
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date(),
  }), indexnow({
    key: '35d48f77e19f633cd5ff531c0e851f35',
    submissionMode: 'changed',
    logMode: 'verbose',
  })],
  build: { inlineStylesheets: 'auto' },
});
