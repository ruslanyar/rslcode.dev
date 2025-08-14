import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'eslint/config';
import { includeIgnoreFile } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import tsEslintParser from '@typescript-eslint/parser';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),

  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: dirname('./'),
      },
    },

    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'import/named': 'error',
    },
  },

  {
    files: ['**/*.{jsx,tsx}'],

    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },

    settings: {
      'better-tailwindcss': {
        entryPoint: './src/app/globals.css',
      },
    },

    rules: {
      ...eslintPluginBetterTailwindcss.configs['recommended-warn'].rules,
      'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', { printWidth: 100 }],
      'better-tailwindcss/no-unregistered-classes': ['warn', { ignore: ['dark'] }],
    },
  },
]);
