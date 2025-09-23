import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'ru'];
const defaultLocale = 'ru';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const preferredLocale = acceptLanguage.split(',')[0].split('-')[0];

  if (locales.includes(preferredLocale)) {
    return preferredLocale;
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and paths with file extensions
    '/((?!api|_next/static|_next/image|.*\\..*).*)',
  ],
};
