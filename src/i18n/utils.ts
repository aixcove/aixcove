import { getRelativeLocaleUrl } from 'astro:i18n';

export const languages = {
  en: 'English',
  zh: '简体中文',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang = 'en';

/** Official helper wrapper: locale-aware URL (/blog/ or /zh/blog/) */
export function localeUrl(lang: Lang, path: string): string {
  // Views use an empty path as a concatenation prefix. It must not add a second slash.
  if (path === '') return lang === 'zh' ? '/zh' : '';
  const clean = path === '/' ? '' : path.replace(/\/+$/, '');
  return getRelativeLocaleUrl(lang, clean);
}
