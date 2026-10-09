import {readFile} from 'node:fs/promises';
import {test, expect} from '@playwright/test';

const readSnapshot = (name: string): Promise<string> =>
  readFile(new URL(`./sitemap-snapshots/${name}`, import.meta.url), 'utf8');

test('has robots.txt with sitemap', async ({request}) => {
  const response = await request.get('/robots.txt');
  expect(response.ok()).toBe(true);

  const txt = await response.text();
  expect(txt).toEqual(await readSnapshot('robots.txt'));
});

test('has sitemap.xml with indexed pages', async ({request}) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBe(true);

  const xml = await response.text();
  expect(xml).toEqual(await readSnapshot('sitemap.xml'));
});
