import {defineCollection, z} from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    noIndex: z.boolean().optional().default(false),
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {articles};
