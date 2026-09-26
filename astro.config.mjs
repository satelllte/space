// @ts-check
import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://satelllte.pages.dev',
  integrations: [mdx(), react(), tailwind()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
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
  build: {assets: 'assets/_generated'},
});
