import Link from 'next/link';

import { getSortedPostsData } from '@/shared/lib';
import { getDictionary } from '@/shared/config/i18n/get-dictionary';

import type { Locale } from '@/shared/config/i18n/i18n-config';

const POSTS_PER_PAGE = 3;

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
      <ul className='space-y-8'>
        {paginatedPosts.map(({ slug, date, title, summary }) => (
          <li key={slug}>
            <article>
              <h2 className='text-2xl font-bold'>
                <Link href={`/${locale}/blog/${slug}`} className='hover:text-primary'>
                  {title}
                </Link>
              </h2>
              <time dateTime={date} className='text-sm text-zinc-400'>
                {new Date(date).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <p className='mt-2'>{summary}</p>
            </article>
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
