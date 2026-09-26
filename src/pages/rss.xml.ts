import type {APIRoute} from 'astro';
import {getArticleHref, getArticles} from '../lib/articles';

export const GET: APIRoute = async ({site}) => {
  const articles = await getArticles();
  const siteUrl = new URL('/', site).href;

  const items = articles.map((article) => {
    const url = new URL(getArticleHref(article), site).href;
    return [
      '<item>',
      `<title>${escapeXml(article.data.title)}</title>`,
      `<link>${url}</link>`,
      `<guid isPermaLink="true">${url}</guid>`,
      `<description>${escapeXml(article.data.description)}</description>`,
      `<pubDate>${article.data.publishedAt.toUTCString()}</pubDate>`,
      ...article.data.tags.map(
        (tag) => `<category>${escapeXml(tag)}</category>`,
      ),
      '</item>',
    ].join('');
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '<channel>',
    '<title>satelllte/space • Articles</title>',
    `<link>${siteUrl}</link>`,
    `<atom:link href="${new URL('/rss.xml', site).href}" rel="self" type="application/rss+xml"/>`,
    '<description>Articles about Three.js, React Three Fiber (R3F), Shaders, WebGL, WebGPU, and beyond.</description>',
    '<language>en-us</language>',
    ...items,
    '</channel>',
    '</rss>',
  ].join('\n');

  return new Response(xml, {
    headers: {'Content-Type': 'application/rss+xml; charset=utf-8'},
  });
};

const escapeXml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
