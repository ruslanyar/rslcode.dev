import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

import type { Locale } from '@/shared/config/i18n/i18n-config';

const postsDirectory = path.join(process.cwd(), 'content/blog');

function getBlogFileNames() {
  try {
    return fs.readdirSync(postsDirectory);
  } catch {
    return [];
  }
}

export async function getSortedPostsData(locale: Locale) {
  const fileNames = getBlogFileNames();

  if (fileNames.length === 0) return [];

  const localeFileNames = fileNames.filter((fileName) => fileName.endsWith(`.${locale}.mdx`));

  if (localeFileNames.length === 0) return [];

  const allPostsData = await Promise.all(
    localeFileNames.map(async (fileName) => {
      const slug = fileName.replace(`.${locale}.mdx`, '');
      const { frontmatter } = await import(`@content/blog/${fileName}`);
      return {
        slug,
        ...(frontmatter as { title: string; date: string; summary: string }),
      };
    })
  );

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    else return -1;
  });
}

export function getAllPostSlugs() {
  const fileNames = getBlogFileNames();

  if (fileNames.length === 0) return [];

  const mdxFileNames = fileNames.filter((fileName) => /\.(ru|en)\.mdx$/.test(fileName));

  if (mdxFileNames.length === 0) return [];

  const slugs = mdxFileNames.map((fileName) => fileName.replace(/\.(ru|en)\.mdx$/, ''));
  const uniqueSlugs = Array.from(new Set(slugs));
  return uniqueSlugs.map((slug) => ({ slug }));
}

export async function getPost(slug: string, locale: Locale) {
  const filePath = path.join(postsDirectory, `${slug}.${locale}.mdx`);

  if (!fs.existsSync(filePath)) notFound();

  const {
    frontmatter,
    metadata,
    default: Content,
  } = await import(`@content/blog/${slug}.${locale}.mdx`);
  return { frontmatter, metadata, Content };
}
