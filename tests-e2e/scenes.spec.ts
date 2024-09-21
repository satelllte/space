import {test, expect, type Page} from '@playwright/test';
import {expectDescription, expectTitle} from './_utils';

test('navigates to scenes', async ({page}) => {
  const back = async () => {
    await page.getByRole('link', {name: '<- Back', exact: true}).click();
    await expect(page).toHaveURL('/');
  };

  await page.goto('/');

  const description =
    "The creative space of @satelllte's software engineer. Three.js, React Three Fiber (R3F), Shaders, WebGL, WebGPU, and beyond.";

  await page.getByRole('link', {name: 'Particles', exact: true}).click();
  await expectScenePage({
    page,
    url: '/scenes/particles',
    title: 'satelllte/space • Particles',
    description,
  });
  await back();

  await page.getByRole('link', {name: 'Transmission', exact: true}).click();
  await expectScenePage({
    page,
    url: '/scenes/transmission',
    title: 'satelllte/space • Transmission',
    description,
  });
  await back();
});

test('has error message for each scene when JS disabled', async ({browser}) => {
  const context = await browser.newContext({javaScriptEnabled: false});
  const page = await context.newPage();

  await page.goto('/scenes/particles');
  await expectDisabledJSMessage({page});

  await page.goto('/scenes/transmission');
  await expectDisabledJSMessage({page});
});

const expectDisabledJSMessage = async ({page}: {page: Page}) => {
  await expect(
    page.getByText(
      'Cannot display the scene because JavaScript is disabled in this browser :(',
      {exact: true},
    ),
  ).toBeVisible();
};

const expectScenePage = async ({
  page,
  url,
  title,
  description,
}: {
  page: Page;
  url: string;
  title: string;
  description: string;
}) => {
  await expect(page).toHaveURL(url);
  await expectTitle({page, value: title});
  await expectDescription({page, value: description});
};
