import Image from 'next/image';
import Link from 'next/link';

import { TAGS } from '@/shared/config/tags';
import { type Locale } from '@/shared/config/i18n/i18n-config';
import type { PostFrontmatter } from '@/entities/post/model/types';

interface Post extends PostFrontmatter {
  slug: string;
}

interface Props {
  post: Post;
  locale: Locale;
}

export const PostCard = ({ post, locale }: Props) => {
  return (
    <article
      className={`
        grid grid-cols-12 gap-4 rounded-lg p-4 transition-colors duration-300
        has-[[data-name="post-link"]:hover]:bg-slate-800
      `}>
      <div
        className={`
          col-span-12 flex flex-col gap-y-4
          xl:col-span-2
        `}>
        <time
          dateTime={post.date}
          className='text-base leading-6 font-medium text-slate-500 transition-colors duration-300'>
          {new Date(post.date).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <div className='flex flex-wrap gap-x-3 gap-y-0.5'>
          {post.tags?.map((tag) => (
            <Link
              key={tag}
              href={`/${locale}/tags/${tag}`}
              className={`
                text-sm font-medium text-primary uppercase
                hover:underline
              `}>
              {TAGS[tag][locale]}
            </Link>
          ))}
        </div>
      </div>
      <Link
        data-name='post-link'
        href={`/${locale}/blog/${post.slug}`}
        className={`
          group col-span-full
          xl:col-span-10
        `}>
        <div
          className={`
            grid grid-cols-12 gap-4
            xl:grid-cols-10
          `}>
          <div
            className={`
              col-span-full space-y-6
              md:col-span-9
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
              col-span-full justify-self-center
              md:col-span-3
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
        </div>
      </Link>
    </article>
  );
};
