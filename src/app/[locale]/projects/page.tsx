import type { Metadata } from 'next';

import { ProjectCard } from '@/entities/project';

import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import { projects } from '@content/projects';

import type { Locale } from '@/shared/config/i18n/i18n-config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return dictionary['projects-page'].metadata;
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <section>
      <h1 className='mb-4 text-4xl font-bold text-primary'>{dictionary['projects-page'].title}</h1>
      <p className='mb-8 text-lg text-zinc-400'>{dictionary['projects-page'].subtitle}</p>
      <div
        className={`
          grid grid-cols-1 gap-8
          md:grid-cols-2
        `}>
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} locale={locale} />
        ))}
      </div>
    </section>
  );
}
