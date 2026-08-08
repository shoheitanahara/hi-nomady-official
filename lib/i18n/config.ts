export const locales = ['ja', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ja';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/** 表示用パス（ja はプレフィックスなし） */
export function localizedPath(locale: Locale, path: string): string {
  const normalized =
    path === '' || path === '/'
      ? '/'
      : path.startsWith('/')
        ? path
        : `/${path}`;

  if (locale === defaultLocale) {
    return normalized;
  }

  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`;
}

/** ブラウザ上の pathname からロケールを除いたパスを返す */
export function stripLocaleFromPathname(pathname: string): string {
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return pathname === '/en' ? '/' : pathname.slice(3);
  }

  if (pathname === '/ja' || pathname.startsWith('/ja/')) {
    return pathname === '/ja' ? '/' : pathname.slice(3);
  }

  return pathname || '/';
}

/** 現在パスを別ロケールのURLへ変換 */
export function switchLocalePath(pathname: string, targetLocale: Locale): string {
  return localizedPath(targetLocale, stripLocaleFromPathname(pathname));
}
