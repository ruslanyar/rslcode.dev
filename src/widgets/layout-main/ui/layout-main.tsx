import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

import type { Dictionary } from '@/shared/config/i18n/get-dictionary';
import type { Locale } from '@/shared/config/i18n/i18n-config';

interface Props {
  children: React.ReactNode;
  dictionary: Dictionary;
  locale: Locale;
}

export const LayoutMain = ({ children, dictionary, locale }: Props) => {
  return (
    <div className='flex min-h-screen flex-col bg-background text-foreground'>
      <Header dictionary={dictionary.navigation} locale={locale} />
      <main className='container mx-auto flex-grow p-4'>{children}</main>
      <Footer />
    </div>
  );
};
