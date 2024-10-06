// @ts-check
import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), react(), tailwind()],
  build: {assets: 'assets/_generated'},
  markdown: {syntaxHighlight: false},
});
