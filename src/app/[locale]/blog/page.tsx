import Link from 'next/link';
import { type Metadata } from 'next';

import { PostCard } from '@/entities/post';
import { PageTitle } from '@/shared/ui/page-title';
import { PageSubtitle } from '@/shared/ui/page-subtitle';

import { getSortedPostsData } from '@/shared/lib';
import { getDictionary } from '@/shared/config/i18n/get-dictionary';

import { type Locale } from '@/shared/config/i18n/i18n-config';

const POSTS_PER_PAGE = 3;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return dictionary['blog-page'].metadata;
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const pageParams = await searchParams;
  const allPosts = await getSortedPostsData(locale);
  const dictionary = await getDictionary(locale);

  if (allPosts.length === 0) {
    return (
      <section
        className={`
          space-y-2 pt-6 pb-8
          md:space-y-8
        `}>
        <PageTitle>{dictionary['blog-page'].title}</PageTitle>
        <PageSubtitle>{dictionary['blog-page'].noPosts}</PageSubtitle>
      </section>
    );
  }

  const currentPage = Number(pageParams?.page) || 1;

  const paginatedPosts = allPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  return (
    <section
      className={`
        space-y-2 pt-6 pb-8
        md:space-y-8
      `}>
      <PageTitle>{dictionary['blog-page'].title}</PageTitle>
      <PageSubtitle>{dictionary['blog-page'].subtitle}</PageSubtitle>
      <ul className='divide-y divide-divider'>
        {paginatedPosts.map((post) => (
          <li key={post.slug} className='py-5'>
            <PostCard post={post} locale={locale} />
          </li>
        ))}
      </ul>

      <div className='mt-12 flex justify-between'>
        {currentPage > 1 ? (
          <Link
            href={`/${locale}/blog?page=${currentPage - 1}`}
            className={`
              rounded-md border border-zinc-700 px-4 py-2
              hover:bg-zinc-800
            `}>
            {dictionary.pagination.previous}
          </Link>
        ) : (
          <div />
        )}
        {currentPage < totalPages ? (
          <Link
            href={`/${locale}/blog?page=${currentPage + 1}`}
            className={`
              rounded-md border border-zinc-700 px-4 py-2
              hover:bg-zinc-800
            `}>
            {dictionary.pagination.next}
          </Link>
        ) : (
          <div />
        )}
      </div>
    </section>
  );
}
