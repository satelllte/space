// @ts-check
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx,mdx}'],
    ignores: ['.astro/*', 'dist/*'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
];
