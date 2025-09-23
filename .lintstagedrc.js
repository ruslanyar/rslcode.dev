import { relative } from 'path';

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => relative(process.cwd(), f)).join(' --file ')}`;

const lintStagedConfig = {
  '*.{js,jsx,ts,tsx,mdx}': [buildEslintCommand],
  '*.{js,jsx,ts,tsx,mdx,json,css,md,yml,yaml}': ['prettier --write'],
};

export default lintStagedConfig;
