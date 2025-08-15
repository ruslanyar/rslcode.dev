import type { Metadata } from 'next';

import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import { i18n, Locale } from '@/shared/config/i18n/i18n-config';
import { LayoutMain } from '@/widgets/layout-main';

import '@/app/globals.css';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'rslcode.dev',
  description: 'RSL Code Dev',
};

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
      <body className={`antialiased`}>
        <LayoutMain dictionary={dictionary} locale={locale}>
          {children}
        </LayoutMain>
      </body>
    </html>
  );
}
