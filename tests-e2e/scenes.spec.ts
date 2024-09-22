import {test, expect, type Page} from '@playwright/test';
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

test('able to navigate from home and back', testNavigation);

test.describe('when JS is disabled', () => {
  test.use({javaScriptEnabled: false});

  test('able to navigate from home and back', testNavigation);

  test('have "Cannot display scene ..." error message', async ({page}) => {
    for (const scene of SCENES) {
      const {href} = scene;
      await page.goto(href);
      await expect(
        page.getByText(
          'Cannot display the scene because JavaScript is disabled in this browser :(',
          {exact: true},
        ),
      ).toBeVisible();
    }
  });
});

async function testNavigation({page}: {page: Page}) {
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

    await page.getByRole('link', {name: 'Go back', exact: true}).click();
    await expect(page).toHaveURL('/');
  }
}
