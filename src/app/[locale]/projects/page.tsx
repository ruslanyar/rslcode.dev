import { type Metadata } from 'next';

import { ProjectCard } from '@/entities/project';

import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import { projects } from '@/shared/config/projects';

import type { Locale } from '@/shared/config/i18n/i18n-config';
import { PageTitle } from '@/shared/ui/page-title';
import { PageSubtitle } from '@/shared/ui/page-subtitle';

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
    <section
      className={`
        space-y-2 pt-6 pb-8
        md:space-y-8
      `}>
      <PageTitle>{dictionary['projects-page'].title}</PageTitle>
      <PageSubtitle>{dictionary['projects-page'].subtitle}</PageSubtitle>
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
