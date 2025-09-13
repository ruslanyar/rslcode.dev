import { type Metadata } from 'next';

import { PostCard } from '@/entities/post';

import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import { getSortedPostsData } from '@/shared/lib';

import { type Locale } from '@/shared/config/i18n/i18n-config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return dictionary['home-page'].metadata;
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const recentPosts = await getSortedPostsData(locale, 5);

  return (
    <div className='divide-y divide-divider'>
      <section
        className={`
          space-y-2 pt-6 pb-8
          md:space-y-5
        `}>
        <h1
          className={`
            text-3xl leading-9 font-extrabold tracking-tight text-primary
            sm:text-4xl sm:leading-10
            md:text-6xl md:leading-14
          `}>
          {dictionary['home-page'].title}
        </h1>
        <p className='text-lg'>{dictionary['home-page'].subtitle}</p>
      </section>

      <section className='py-12'>
        <h2 className='mb-8 text-3xl font-bold'>{dictionary['home-page'].recentPosts}</h2>
        <ul className='space-y-8 divide-y divide-divider'>
          {recentPosts.map((post) => (
            <li key={post.slug} className='py-12'>
              <PostCard post={post} locale={locale} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
