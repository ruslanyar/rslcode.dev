'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { i18n, Locale } from '@/shared/config/i18n/i18n-config';

export const LanguageSwitcher = () => {
  const pathname = usePathname();

  const getRedirectedPathname = (locale: Locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div className='flex gap-2'>
      {i18n.locales.map((locale) => {
        return (
          <Link
            key={locale}
            href={getRedirectedPathname(locale)}
            className={`
              rounded-md border border-zinc-700 px-2 py-1 text-sm
              hover:bg-zinc-800
            `}>
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
};
