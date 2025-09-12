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
    <div
      className={`
        mx-auto flex min-h-screen max-w-7xl flex-col divide-y divide-slate-700 px-4 text-foreground
        sm:px-6
        xl:px-8
      `}>
      <Header dictionary={dictionary.navigation} locale={locale} />
      <main className='flex-grow divide-y divide-slate-700'>{children}</main>
      <Footer />
    </div>
  );
};
