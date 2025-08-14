import { getAllPostSlugs, getPostData } from '@/shared/lib';
import { Locale } from '@/shared/config/i18n/i18n-config';

// This function is needed to pre-render all the blog posts at build time.
export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  // We need to combine slugs with locales
  const locales = ['en', 'ru'];
  const params = paths.flatMap(({ slug }) => locales.map((locale) => ({ slug, locale })));
  return params;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}) {
  const { slug, locale } = await params;
  const postData = await getPostData(slug, locale);

  return (
    <article className='mx-auto prose max-w-none prose-invert'>
      <h1 className='text-primary'>{postData.title}</h1>
      <div className='text-sm text-zinc-400'>
        <time dateTime={postData.date}>
          {new Date(postData.date).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}
