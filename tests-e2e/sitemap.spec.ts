import {test, expect} from '@playwright/test';

test('has sitemap with indexed pages', async ({browserName, request}) => {
  test.skip(browserName !== 'chromium');

  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBe(true);

  const xml = await response.text();
  expect(xml).toMatchSnapshot();
});

test('has robots.txt with sitemap', async ({browserName, request}) => {
  test.skip(browserName !== 'chromium');

  const response = await request.get('/robots.txt');
  expect(response.ok()).toBe(true);

  const xml = await response.text();
  expect(xml).toMatchSnapshot();
});
