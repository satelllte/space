import {test, expect, type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {ARTICLES, SCENES} from './_constants';

const PAGES = [
  '/',
  '/unknown',
  '/articles/test/',
  ...ARTICLES.map(({href}) => href),
  ...SCENES.map(({href}) => href),
] as const;

for (const href of PAGES) {
  test.describe(href, () => {
    test('has no accessibility violations (light)', async ({page}) => {
      await page.emulateMedia({colorScheme: 'light'});
      await page.goto(href);
      await expectNoViolations({page});
    });

    test('has no accessibility violations (dark)', async ({page}) => {
      await page.emulateMedia({colorScheme: 'dark'});
      await page.goto(href);
      await expect(page.locator(':root')).toHaveClass(/dark/);
      await expectNoViolations({page});
    });
  });
}

async function expectNoViolations({page}: {page: Page}) {
  const results = await new AxeBuilder({page}).analyze();
  expect(results.violations).toEqual([]);
}
