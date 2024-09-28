import {test, expect, type Page} from '@playwright/test';

test('uses light theme on first visit (if no preference)', async ({
  page,
  // browserName,
}) => {
  // test.skip(browserName === 'webkit'); // This doesn't seem to work properly for WebKit browser(s) for some reason
  await page.emulateMedia({colorScheme: 'no-preference'});
  await page.goto('/');
  await expectThemeLight({page});
});

test('uses device theme preference on first visit (light)', async ({page}) => {
  await page.emulateMedia({colorScheme: 'light'});
  await page.goto('/');
  await expectThemeLight({page});
});

test('uses device theme preference on first visit (dark)', async ({page}) => {
  await page.emulateMedia({colorScheme: 'dark'});
  await page.goto('/');
  await expectThemeDark({page});
});

test('switches the theme and preserves it (light -> dark)', async ({
  browser,
}) => {
  const context = await browser.newContext({colorScheme: 'light'});
  let page = await context.newPage();
  await page.goto('/');
  await expectThemeLight({page});

  await page.getByLabel('Switch to dark theme').click();
  await page.getByLabel('Switch to light theme').waitFor();
  await page.close();

  page = await context.newPage();
  await page.goto('/');
  await expectThemeDark({page});
});

test('switches the theme and preserves it (dark -> light)', async ({
  browser,
}) => {
  const context = await browser.newContext({colorScheme: 'dark'});
  let page = await context.newPage();
  await page.goto('/');
  await expectThemeDark({page});

  await page.getByLabel('Switch to light theme').click();
  await page.getByLabel('Switch to dark theme').waitFor();
  await page.close();

  page = await context.newPage();
  await page.goto('/');
  await expectThemeLight({page});
});

test.describe('when JS is disabled', () => {
  test.use({javaScriptEnabled: false});

  test('uses light theme', async ({page}) => {
    await page.goto('/');
    await expectThemeLight({page});
  });

  test('has no toggle', async ({page}) => {
    await page.goto('/');
    await expect(
      page.getByLabel(/Switch to (dark|light) theme/),
    ).not.toBeVisible();
  });
});

const expectThemeLight = async ({page}: {page: Page}) => {
  await expect(page.locator(':root')).not.toHaveClass(/dark/);
};

const expectThemeDark = async ({page}: {page: Page}) => {
  await expect(page.locator(':root')).toHaveClass(/dark/);
};
