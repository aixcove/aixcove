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
  }), indexnow({
    key: '35d48f77e19f633cd5ff531c0e851f35',
    submissionMode: 'changed',
    logMode: 'verbose',
  })],
  build: { inlineStylesheets: 'auto' },
});
