import type { Metadata } from 'next';

import { getAllPostSlugs, getPost } from '@/shared/lib';

import { type Locale } from '@/shared/config/i18n/i18n-config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const { frontmatter, metadata } = await getPost(slug, locale);

  if (!metadata) {
    return {
      title: frontmatter.title,
      description: frontmatter.summary,
    };
  }

  return metadata;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}) {
  const { slug, locale } = await params;
  const { frontmatter, Content } = await getPost(slug, locale);

  return (
    <article className='mx-auto prose max-w-none prose-invert'>
      <h1 className='text-primary'>{frontmatter.title}</h1>
      <div className='mb-4 text-sm text-gray-400'>
        <time dateTime={frontmatter.date}>
          {new Date(frontmatter.date).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>
      <Content />
    </article>
  );
}

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  const locales = ['en', 'ru'];
  const params = paths.flatMap(({ slug }) => locales.map((locale) => ({ slug, locale })));
  return params;
}
