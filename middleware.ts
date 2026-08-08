import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isLocale } from '@/lib/i18n/config';

const PUBLIC_FILE = /\.[^/]+$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  const maybeLocale = segments[0];

  // /ja → / へ正規化
  if (maybeLocale === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname =
      segments.length === 1 ? '/' : `/${segments.slice(1).join('/')}`;
    return NextResponse.redirect(url);
  }

  // /en... はそのまま通す
  if (isLocale(maybeLocale) && maybeLocale !== defaultLocale) {
    const response = NextResponse.next();
    response.headers.set('x-locale', maybeLocale);
    return response;
  }

  // プレフィックスなし → 内部的に /ja/... へ rewrite
  const url = request.nextUrl.clone();
  url.pathname =
    pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;

  const response = NextResponse.rewrite(url);
  response.headers.set('x-locale', defaultLocale);
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
