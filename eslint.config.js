// @ts-check
import ESLintJS from '@eslint/js';
import ESLintTS from 'typescript-eslint';

export default [
  ESLintJS.configs.recommended,
  ...ESLintTS.configs.recommendedTypeChecked,
  {
    // files: ['**/*.{js,mjs,cjs,ts,jsx,tsx,mdx}'],
    // ignores: ['./dist'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
];
