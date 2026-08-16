import { getRelativeLocaleUrl } from 'astro:i18n';

export const languages = {
  en: 'English',
  zh: '简体中文',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang = 'en';

/** Thin wrapper around Astro's official locale URL helper. */
export function localeUrl(lang: Lang, path: string): string {
  const clean = path === '/' ? '' : path.replace(/^\/+|\/+$/g, '');
  return getRelativeLocaleUrl(lang, clean);
}
