import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.config.js',
      'src/api/**',
      'www/**',
      '**/*.d.ts',
      'src/legacy/**',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    plugins: {
      js,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': jsxA11y,
      prettier,
      import: importPlugin,
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'prettier/prettier': 'warn',

      // Группировка импортов
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@src/**',
              group: 'internal',
            },
            {
              pattern: '@app/**',
              group: 'internal',
            },
            {
              pattern: '@pages/**',
              group: 'internal',
            },
            {
              pattern: '@widgets/**',
              group: 'internal',
            },
            {
              pattern: '@features/**',
              group: 'internal',
            },
            {
              pattern: '@entities/**',
              group: 'internal',
            },
            {
              pattern: '@shared/**',
              group: 'internal',
            },
            {
              pattern: '*.scss',
              group: 'unknown',
              position: 'after',
              patternOptions: { matchBase: true },
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'type'],
        },
      ],

      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  tseslint.configs.recommended,
]);
