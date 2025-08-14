import Link from 'next/link';

import { LanguageSwitcher } from '@/features/language-switcher';
import { Logo } from '@/shared/ui/logo';

interface Props {
  dictionary: {
    home: string;
    blog: string;
    projects: string;
  };
}

export const Header = ({ dictionary }: Props) => {
  return (
    <header className='border-b border-b-zinc-800'>
      <div className='container mx-auto flex items-center justify-between p-4'>
        <Logo />
        <nav className='flex items-center gap-4'>
          <Link href='/' className='hover:text-primary'>
            {dictionary.home}
          </Link>
          <Link href='/blog' className='hover:text-primary'>
            {dictionary.blog}
          </Link>
          <Link href='/projects' className='hover:text-primary'>
            {dictionary.projects}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
};
