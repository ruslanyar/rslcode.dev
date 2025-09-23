import { type Metadata } from 'next';

import { Tags } from '@/entities/post';
import { PageTitle } from '@/shared/ui/page-title';

import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import { type Locale } from '@/shared/config/i18n/i18n-config';
import { type TagKey, TAGS } from '@/shared/config/tags';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return dictionary['tags-page'];
}

export default async function TagsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const tags = Object.keys(TAGS) as TagKey[];

  return (
    <section
      className={`
        grid grid-cols-1 items-center justify-center justify-items-center gap-5
        sm:grid-cols-[min-content_min-content_minmax(180px,400px)]
      `}>
      <PageTitle>{dictionary['tags-page'].title}</PageTitle>
      <div
        className={`
          h-0.5 w-3/5 bg-divider
          sm:h-4/5 sm:w-0.5
        `}
      />
      <Tags tags={tags} locale={locale} />
    </section>
  );
}
