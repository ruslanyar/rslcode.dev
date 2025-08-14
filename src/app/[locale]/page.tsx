import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import { Locale } from '@/shared/config/i18n/i18n-config';

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return (
    <section>
      <h1 className='text-4xl font-bold text-primary'>{dictionary.homepage.title}</h1>
      <p className='mt-4 text-lg'>{dictionary.homepage.subtitle}</p>
    </section>
  );
}
