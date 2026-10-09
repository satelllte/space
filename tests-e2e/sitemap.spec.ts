import {test, expect} from '@playwright/test';

const ROBOTS_TXT = `User-agent: *
Allow: /

Sitemap: https://satelllte.pages.dev/sitemap.xml`;

const SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>https://satelllte.pages.dev/</loc></url>
<url><loc>https://satelllte.pages.dev/articles/stretching-pixels-with-glsl/</loc><lastmod>2026-10-09T00:00:00.000Z</lastmod></url>
<url><loc>https://satelllte.pages.dev/articles/visual-regression-testing-for-threejs-scenes/</loc><lastmod>2026-09-28T00:00:00.000Z</lastmod></url>
</urlset>`;

test('has robots.txt with sitemap', async ({browserName, request}) => {
  test.skip(browserName !== 'chromium');

  const response = await request.get('/robots.txt');
  expect(response.ok()).toBe(true);

  const xml = await response.text();
  expect(xml).toEqual(ROBOTS_TXT);
});

test('has sitemap.xml with indexed pages', async ({browserName, request}) => {
  test.skip(browserName !== 'chromium');

  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBe(true);

  const xml = await response.text();
  expect(xml).toEqual(SITEMAP_XML);
});
