import type { Metadata } from 'next';

import { LayoutMain } from '@/widgets/layout-main';

import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import { i18n, Locale } from '@/shared/config/i18n/i18n-config';

import '@/app/globals.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return {
    title: {
      template: '%s | rslcode.dev',
      default: dictionary.site.title,
    },
    description: dictionary.site.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body className={`bg-background text-foreground antialiased`}>
        <LayoutMain dictionary={dictionary} locale={locale}>
          {children}
        </LayoutMain>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}
