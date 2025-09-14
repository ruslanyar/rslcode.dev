import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeExpressiveCode from 'rehype-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypeExpressiveCode,
        {
          themes: ['solarized-dark', 'solarized-light'],
          plugins: [pluginLineNumbers()],
          styleOverrides: {
            codeFontFamily: 'Fira Code',
            uiFontFamily: 'Fira Code',
          },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
