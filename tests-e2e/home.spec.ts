import {test, expect, type Locator} from '@playwright/test';
import {expectDescription, expectTitle} from './_utils';

test('has title & description', async ({page}) => {
  await page.goto('/');
  await expectTitle({page, value: 'satelllte/space'});
  await expectDescription({
    page,
    value:
      "The creative space of @satelllte's software engineer. Three.js, React Three Fiber (R3F), Shaders, WebGL, WebGPU, and beyond.",
  });
});

test('has header', async ({page}) => {
  await page.goto('/');

  const header = page.getByRole('banner');
  await expect(header).toBeVisible();

  const link = header.getByRole('link', {
    name: 'GitHub repository',
    exact: true,
  });
  await expectExternalLink({link, href: 'https://github.com/satelllte/space'});
});

test('has footer', async ({page}) => {
  await page.goto('/');

  const footer = page.getByRole('contentinfo');
  await expect(footer).toBeVisible();

  const themeToggle = footer.getByLabel(/Switch to (dark|light) theme/);
  await expect(themeToggle).toBeVisible();
});

test('has scenes links', async ({page}) => {
  await page.goto('/');

  const list = page.getByRole('list', {name: 'Scenes', exact: true});
  await expect(list).toBeVisible();
  await expect(list.getByRole('listitem')).toHaveCount(2);

  const links = [
    {name: 'Particles', href: '/scenes/particles'},
    {name: 'Transmission', href: '/scenes/transmission'},
  ] as const;

  for (const _link of links) {
    const {name, href} = _link;
    const link = list.getByRole('link', {name, exact: true});
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', href);
    await expect(link).toHaveAttribute('target', '_self');
  }
});

test('has external links', async ({page}) => {
  await page.goto('/');

  const list = page.getByRole('list', {name: 'More', exact: true});
  await expect(list).toBeVisible();
  await expect(list.getByRole('listitem')).toHaveCount(2);

  const links = [
    {name: 'GitHub', href: 'https://github.com/satelllte'},
    {name: 'Unsplash', href: 'https://unsplash.com/@satelllte'},
  ] as const;

  for (const _link of links) {
    const {name, href} = _link;
    const link = list.getByRole('link', {name, exact: true});
    await expectExternalLink({link, href});
  }
});

const expectExternalLink = async ({
  link,
  href,
}: {
  link: Locator;
  href: string;
}) => {
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute('href', href);
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', 'noreferrer noopener');
};
