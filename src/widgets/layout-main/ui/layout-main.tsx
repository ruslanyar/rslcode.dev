import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

import { getDictionary } from '@/shared/config/i18n/get-dictionary';

// Create a type for our dictionary
type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

interface Props {
  children: React.ReactNode;
  dictionary: Dictionary;
}

export const LayoutMain = ({ children, dictionary }: Props) => {
  return (
    <div className='flex min-h-screen flex-col bg-background text-foreground'>
      <Header dictionary={dictionary.navigation} />
      <main className='container mx-auto flex-grow p-4'>{children}</main>
      <Footer />
    </div>
  );
};
