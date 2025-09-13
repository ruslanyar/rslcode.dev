import Link from 'next/link';

import { TAGS } from '@/shared/config/tags';

import type { PostFrontmatter } from '@/entities/post/model/types';
import { type Locale } from '@/shared/config/i18n/i18n-config';

interface TagsProps {
  locale: Locale;
  tags?: PostFrontmatter['tags'];
}

export const Tags = ({ tags, locale }: TagsProps) => {
  if (!tags) return null;

  return (
    <ul className='flex flex-wrap gap-x-3 gap-y-0.5'>
      {tags.map((tag) => (
        <li key={tag} className='group relative overflow-hidden'>
          <Link
            href={`/${locale}/tags/${tag}`}
            className={`
              text-sm font-medium text-sky-300 uppercase transition-colors duration-300
              hover:text-primary
            `}>
            {TAGS[tag][locale]}
          </Link>
          <div
            className={`
              absolute bottom-0 h-0.25 w-full -translate-x-11/10 bg-sky-300
              transition-[translate,background-color] duration-300
              group-hover:translate-none group-hover:bg-primary
            `}
          />
        </li>
      ))}
    </ul>
  );
};
