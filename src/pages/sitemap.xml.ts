import type {APIRoute} from 'astro';
import {getArticleHref, getArticles} from '../lib/articles';

type Page = {
  path: string;
  lastmod?: Date;
};

const pages: Page[] = [{path: '/'}];

export const GET: APIRoute = async ({site}) => {
  const articles = await getArticles({onlyIndexed: true});
  const entries: Page[] = [
    ...pages,
    ...articles.map((article) => ({
      path: getArticleHref(article.slug),
      lastmod: article.data.publishedAt,
    })),
  ];

  const urls = entries.map(({path, lastmod}) => {
    const loc = `<loc>${new URL(path, site).href}</loc>`;
    if (!lastmod) return `<url>${loc}</url>`;
    return `<url>${loc}<lastmod>${lastmod.toISOString()}</lastmod></url>`;
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
  ].join('\n');

  return new Response(xml, {
    headers: {'Content-Type': 'application/xml; charset=utf-8'},
  });
};
