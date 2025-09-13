import type { StaticImageData } from 'next/image';

export interface PostFrontmatter {
  title: string;
  date: string;
  summary: string;
  image?: StaticImageData;
}
