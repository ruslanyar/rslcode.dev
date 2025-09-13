import Image from 'next/image';
import Link from 'next/link';

import { type Locale } from '@/shared/config/i18n/i18n-config';
import type { PostFrontmatter } from '@/entities/post/model/types';

// Расширяем наш базовый тип, добавляя slug
interface Post extends PostFrontmatter {
  slug: string;
}

interface Props {
  post: Post;
  locale: Locale;
}

export const PostCard = ({ post, locale }: Props) => {
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className='group'>
      <article
        className={`
          grid grid-cols-12 gap-4 rounded-lg p-4 transition-colors duration-300
          hover:bg-gray-800
        `}>
        <div
          className={`
            col-span-12
            xl:col-span-2
          `}>
          <time
            dateTime={post.date}
            className={`
              text-base leading-6 font-medium text-slate-500 transition-colors duration-300
              group-hover:text-gray-100
            `}>
            {new Date(post.date).toLocaleDateString(locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
        <div
          className={`
            col-span-9 space-y-6
            xl:col-span-8
          `}>
          <h2
            className={`
              text-2xl leading-8 font-bold tracking-tight text-gray-100 transition-colors
              duration-300
              group-hover:text-primary
            `}>
            {post.title}
          </h2>
          <p>{post.summary}</p>
        </div>
        <div
          className={`
            col-span-3
            xl:col-span-2
          `}>
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              className='h-46 w-46 rounded-lg object-cover object-top'
            />
          )}
        </div>
      </article>
    </Link>
  );
};
