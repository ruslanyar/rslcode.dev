import Link from 'next/link';

import { LanguageSwitcher } from '@/features/language-switcher';
import { Logo } from '@/shared/ui/logo';
import type { Locale } from '@/shared/config/i18n/i18n-config';

interface Props {
  dictionary: {
    label: string;
    href: string;
  }[];
  locale: Locale;
}

export const Header = ({ dictionary, locale }: Props) => {
  return (
    <header className='border-b border-b-zinc-800'>
      <div className='container mx-auto flex items-center justify-between p-4'>
        <Logo />
        <nav className='flex items-center gap-4'>
          {dictionary.map(({ label, href }) => (
            <Link key={label} href={`/${locale}${href}`} className='hover:text-primary'>
              {label}
            </Link>
          ))}

          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
};