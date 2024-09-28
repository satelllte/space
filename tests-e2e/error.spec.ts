import {test, expect, type Page} from '@playwright/test';
import {expectDescription, expectTitle} from './_utils';

test.beforeEach(async ({page}) => {
  const response = await page.goto('/unknown');
  expect(response?.status()).toEqual(404);
});

test('has metadata', hasMetadata);

test('has heading', hasHeading);

test('can navigate back', canNavigateBack);

test.describe('when JS is disabled', () => {
  test.use({javaScriptEnabled: false});

  test('has metadata', hasMetadata);

  test('has heading', hasHeading);

  test('can navigate back', canNavigateBack);
});

async function hasMetadata({page}: {page: Page}) {
  await expectTitle({page, value: 'satelllte/space • Not found'});
  await expectDescription({
    page,
    value:
      "The creative space of @satelllte's software engineer. Three.js, React Three Fiber (R3F), Shaders, WebGL, WebGPU, and beyond.",
  });
}

async function hasHeading({page}: {page: Page}) {
  const heading = await page.getByRole('heading', {name: 'Page not found.'});
  await expect(heading).toBeVisible();
}

async function canNavigateBack({page}: {page: Page}) {
  await page.getByRole('link', {name: 'Go back', exact: true}).click();
  await expect(page).toHaveURL('/');
}
