import {test, expect} from '@playwright/test';
import {expectDescription, expectTitle} from './_utils';

const SCENES = [
  {
    name: 'Particles',
    href: '/scenes/particles',
    title: 'satelllte/space • Particles',
  },
  {
    name: 'Transmission',
    href: '/scenes/transmission',
    title: 'satelllte/space • Transmission',
  },
] as const;

test('navigates from home', async ({page}) => {
  await page.goto('/');

  for (const scene of SCENES) {
    const {name, href, title} = scene;
    await page.getByRole('link', {name, exact: true}).click();

    await expect(page).toHaveURL(href);
    await expectTitle({page, value: title});
    await expectDescription({
      page,
      value:
        "The creative space of @satelllte's software engineer. Three.js, React Three Fiber (R3F), Shaders, WebGL, WebGPU, and beyond.",
    });

    await page.getByRole('link', {name: '<- Back', exact: true}).click();
    await expect(page).toHaveURL('/');
  }
});

test('has error message when JS disabled', async ({browser}) => {
  const context = await browser.newContext({javaScriptEnabled: false});
  const page = await context.newPage();
  for (const scene of SCENES) {
    const {href: url} = scene;
    await page.goto(url);
    await expect(
      page.getByText(
        'Cannot display the scene because JavaScript is disabled in this browser :(',
        {exact: true},
      ),
    ).toBeVisible();
  }
});
