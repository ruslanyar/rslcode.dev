import Link from 'next/link';

import { LanguageSwitcher } from '@/features/language-switcher';
import { Logo } from '@/shared/ui/logo';

interface Props {
  dictionary: {
    label: string;
    href: string;
  }[];
}

export const Header = ({ dictionary }: Props) => {
  return (
    <header className='border-b border-b-zinc-800'>
      <div className='container mx-auto flex items-center justify-between p-4'>
        <Logo />
        <nav className='flex items-center gap-4'>
          {dictionary.map(({ label, href }) => (
            <Link key={label} href={href} className='hover:text-primary'>
              {label}
            </Link>
          ))}

          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
};
