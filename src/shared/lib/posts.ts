import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { Locale } from '@/shared/config/i18n/i18n-config';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getSortedPostsData(locale: Locale) {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(`.${locale}.md`))
    .map((fileName) => {
      const slug = fileName.replace(`.${locale}.md`, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        slug,
        ...(matterResult.data as { title: string; date: string; summary: string }),
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(slug: string, locale: Locale) {
  const fullPath = path.join(postsDirectory, `${slug}.${locale}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypePrettyCode, {
      theme: {
        dark: 'github-dark',
        light: 'github-light',
      },
    })
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as { title: string; date: string; summary: string }),
  };
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  // We just need the base slug, not locale-specific ones
  const slugs = fileNames.map((fileName) => fileName.replace(/\.(ru|en)\.md$/, ''));
  // Use a Set to get unique slugs
  return Array.from(new Set(slugs)).map((slug) => ({ slug }));
}
