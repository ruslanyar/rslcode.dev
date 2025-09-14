import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

import type { PostFrontmatter } from '@/entities/post/model/types';
import type { Locale } from '@/shared/config/i18n/i18n-config';
import { TagKey } from '@/shared/config/tags';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getAllPostSlugs() {
  try {
    const slugs = fs
      .readdirSync(postsDirectory, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function getSortedPostsData(locale: Locale, limit?: number) {
  const slugs = getAllPostSlugs().map((p) => p.slug);
  if (slugs.length === 0) return [];

  const postsPromises = slugs.map(async (slug) => {
    try {
      const { frontmatter } = await import(`@content/blog/${slug}/${slug}.${locale}.mdx`);
      return {
        slug,
        ...(frontmatter as PostFrontmatter),
      };
    } catch {
      return null;
    }
  });

  const allPosts = await Promise.all(postsPromises);

  const filteredPosts = allPosts.filter((post): post is NonNullable<typeof post> => post !== null);

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (a.date < b.date) return 1;
    else return -1;
  });

  if (limit) {
    return sortedPosts.slice(0, limit);
  }

  return sortedPosts;
}

export async function getPost(slug: string, locale: Locale) {
  try {
    const {
      frontmatter,
      metadata,
      default: Content,
    } = await import(`@content/blog/${slug}/${slug}.${locale}.mdx`);
    return { frontmatter, metadata, Content };
  } catch {
    notFound();
  }
}

export async function getPostsByTag(tag: TagKey, locale: Locale) {
  const allPosts = await getSortedPostsData(locale);
  const filteredPosts = allPosts.filter((post) => post.tags?.includes(tag));
  return filteredPosts;
}
