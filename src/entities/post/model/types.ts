import type { StaticImageData } from 'next/image';
import type { TagKey } from '@/shared/config/tags';

export interface PostFrontmatter {
  title: string;
  date: string;
  summary: string;
  image?: StaticImageData;
  tags?: TagKey[];
}
