export const TAGS = {
  react: { en: 'React', ru: 'React' },
  nextjs: { en: 'Next.js', ru: 'Next.js' },
  typescript: { en: 'TypeScript', ru: 'TypeScript' },
  css: { en: 'CSS', ru: 'CSS' },
  tailwind: { en: 'Tailwind CSS', ru: 'Tailwind CSS' },
} as const;

export type TagKey = keyof typeof TAGS;
