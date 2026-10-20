import {defineCollection} from 'astro:content';
import {glob} from 'astro/loaders';
import {z} from 'astro/zod';

const articles = defineCollection({
  loader: glob({pattern: '**/[^_]*.{md,mdx}', base: './src/content/articles'}),
  schema: z.object({
    noIndex: z.boolean().optional().default(false),
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {articles};
