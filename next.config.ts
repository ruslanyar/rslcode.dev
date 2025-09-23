import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeExpressiveCode, { type RehypeExpressiveCodeOptions } from 'rehype-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

const rehypeExpressiveCodeOptions: RehypeExpressiveCodeOptions = {
  themes: ['solarized-dark', 'solarized-light'],
  plugins: [pluginLineNumbers()],
  styleOverrides: {
    codeFontFamily: 'Fira Code',
    codeFontSize: '0.875rem',
    uiFontFamily: 'Fira Code',
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypeExpressiveCode, rehypeExpressiveCodeOptions]],
  },
});

export default withMDX(nextConfig);
