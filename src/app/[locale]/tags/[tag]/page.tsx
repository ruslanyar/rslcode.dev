import { type Metadata } from 'next';

import { PostCard } from '@/entities/post';
import { PageTitle } from '@/shared/ui/page-title';
import { getPostsByTag } from '@/shared/lib/posts';
import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import { type Locale } from '@/shared/config/i18n/i18n-config';
import { TAGS, type TagKey } from '@/shared/config/tags';

interface PageProps {
  params: Promise<{
    tag: TagKey;
    locale: Locale;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag, locale } = await params;
  const dictionary = await getDictionary(locale);
  const tagName = TAGS[tag][locale];
  const metaTitle = dictionary['tag-page'].metaTitle.replace('{tagName}', tagName);

  return {
    title: metaTitle,
  };
}

export function generateStaticParams() {
  const tags = Object.keys(TAGS);
  return tags.map((tag) => ({ tag }));
}

export default async function TagPage({ params }: PageProps) {
  const { tag, locale } = await params;
  const dictionary = await getDictionary(locale);
  const posts = await getPostsByTag(tag, locale);
  const tagName = TAGS[tag][locale];

  return (
    <section>
      <PageTitle>
        {dictionary['tag-page'].title} <span className='text-secondary'>{tagName}</span>
      </PageTitle>
      <ul className='divide-y divide-divider'>
        {posts.map((post) => (
          <li key={post.slug} className='py-5'>
            <PostCard post={post} locale={locale} />
          </li>
        ))}
      </ul>
    </section>
  );
}
