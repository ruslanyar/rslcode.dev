import fs from 'fs';
import path from 'path';

import type { Locale } from '@/shared/config/i18n/i18n-config';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export async function getSortedPostsData(locale: Locale) {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(`.${locale}.mdx`));

  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(`.${locale}.mdx`, '');

      const { frontmatter } = await import(`@content/blog/${fileName}`);

      return {
        slug,
        ...(frontmatter as { title: string; date: string; summary: string }),
      };
    })
  );

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  const slugs = fileNames.map((fileName) => fileName.replace(/\.(ru|en)\.mdx$/, ''));
  const uniqueSlugs = Array.from(new Set(slugs));
  return uniqueSlugs.map((slug) => ({ slug }));
}

export async function getPost(slug: string, locale: Locale) {
  const {
    frontmatter,
    metadata,
    default: Content,
  } = await import(`@content/blog/${slug}.${locale}.mdx`);
  return { frontmatter, metadata, Content };
}
