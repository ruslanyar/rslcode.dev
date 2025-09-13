import Link from 'next/link';

import { type Project } from '@content/projects';
import { type Locale } from '@/shared/config/i18n/i18n-config';

interface Props {
  project: Project;
  locale: Locale;
}

export const ProjectCard = ({ project, locale }: Props) => {
  return (
    <div className='flex h-full flex-col rounded-lg border border-zinc-800 bg-zinc-900 p-6'>
      <h3 className='mb-2 text-xl font-bold text-primary'>{project.name}</h3>
      <p className='mb-4 flex-grow text-zinc-400'>{project.description[locale]}</p>
      <div className='mb-4 flex flex-wrap gap-2'>
        {project.stack.map((tech) => (
          <span key={tech} className='rounded-full bg-zinc-800 px-3 py-1 text-sm text-secondary'>
            {tech}
          </span>
        ))}
      </div>
      <div className='mt-auto flex gap-4'>
        <Link
          href={project.links.github}
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-primary'>
          GitHub
        </Link>
        {project.links.live && (
          <Link
            href={project.links.live}
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-primary'>
            Live Demo
          </Link>
        )}
      </div>
    </div>
  );
};
