import Link from 'next/link';
import { getSortedPostsData } from '@/shared/lib';
import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import { Locale } from '@/shared/config/i18n/i18n-config';

export default async function BlogPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const allPosts = getSortedPostsData(locale);
  const dictionary = await getDictionary(locale);

  return (
    <section>
      <h1 className='mb-8 text-4xl font-bold text-primary'>{dictionary.blog.title}</h1>
      <p className='mb-8 text-lg'>{dictionary.blog.subtitle}</p>
      <ul className='space-y-8'>
        {allPosts.map(({ slug, date, title, summary }) => (
          <li key={slug}>
            <article>
              <h2 className='text-2xl font-bold'>
                <Link href={`/blog/${slug}`} className='hover:text-primary'>
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
    </section>
  );
}
