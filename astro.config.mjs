// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import {defineConfig} from 'astro/config';
import {createCssVariablesTheme} from 'shiki';

// https://astro.build/config
export default defineConfig({
  site: 'https://satelllte.pages.dev',
  build: {assets: 'assets/_generated'},
  integrations: [mdx(), react()],
  vite: {plugins: [tailwindcss()]},
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      // CSS variables ("--shiki-*") defined in "src/styles/global.css"
      theme: createCssVariablesTheme(),
      transformers: [
        {
          name: 'file',
          pre(node) {
            const match = this.options.meta?.__raw?.match(/file="([^"]+)"/);
            if (!match) return;
            node.properties['data-file'] = match[1];
          },
        },
      ],
    },
  },
});
