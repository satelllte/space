import {getCollection, type CollectionEntry} from 'astro:content';

export type Article = CollectionEntry<'articles'>;

export const AUTHOR = {
  name: 'satelllte',
  url: 'https://github.com/satelllte',
} as const;

export async function getArticles(): Promise<Article[]> {
  return (await getCollection('articles'))
    .filter((article) => article.slug !== 'test')
    .sort(
      (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
    );
}

export const getArticleHref = (article: Article): string =>
  `/articles/${article.slug}/`;
