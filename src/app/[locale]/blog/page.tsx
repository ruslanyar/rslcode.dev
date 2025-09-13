import Link from 'next/link';
import { type Metadata } from 'next';

import { PostCard } from '@/entities/post';

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
      <section>
        <h1 className='mb-8 text-4xl font-bold text-primary'>{dictionary['blog-page'].title}</h1>
        <p className='text-lg text-zinc-400'>{dictionary['blog-page'].noPosts}</p>
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
    <section>
      <h1 className='mb-8 text-4xl font-bold text-primary'>{dictionary['blog-page'].title}</h1>
      <p className='mb-8 text-lg text-zinc-400'>{dictionary['blog-page'].subtitle}</p>
      <ul className='divide-y divide-slate-700'>
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
