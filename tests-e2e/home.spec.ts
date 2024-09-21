import {test, expect, type Locator} from '@playwright/test';
import {expectDescription, expectTitle} from './_utils';

test('has correct title & description', async ({page}) => {
  await page.goto('/');
  await expectTitle({page, value: 'satelllte/space'});
  await expectDescription({
    page,
    value:
      "The creative space of @satelllte's software engineer. Three.js, React Three Fiber (R3F), Shaders, WebGL, WebGPU, and beyond.",
  });
});

test('has correct external links', async ({page}) => {
  await page.goto('/');
  await expectExternalLink({
    link: page.getByRole('link', {name: 'GitHub repository', exact: true}),
    href: 'https://github.com/satelllte/space',
  });
  await expectExternalLink({
    link: page.getByRole('link', {name: 'GitHub', exact: true}),
    href: 'https://github.com/satelllte',
  });
  await expectExternalLink({
    link: page.getByRole('link', {name: 'Unsplash', exact: true}),
    href: 'https://unsplash.com/@satelllte',
  });
});

const expectExternalLink = async ({
  link,
  href,
}: {
  link: Locator;
  href: string;
}) => {
  await expect(link).toHaveAttribute('href', href);
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', 'noreferrer noopener');
};
