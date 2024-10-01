import {test, expect, type Locator, type Page} from '@playwright/test';
import {expectDescription, expectTitle} from './_utils';
import {SCENES} from './_constants';

test('has metadata', testMetadata);

test('has header with repository link', testHeader);

test('has scenes links', testScenesLinks);

test('has external links', testExternalLinks);

test('has footer with theme toggle', async ({page}) => {
  await page.goto('/');
  const footer = page.getByRole('contentinfo');
  await expect(footer).toBeVisible();
  const themeToggle = footer.getByLabel(/Switch to (dark|light) theme/);
  await expect(themeToggle).toBeVisible();
});

test.describe('when JS is disabled', () => {
  test.use({javaScriptEnabled: false});

  test('has metadata', testMetadata);

  test('has header with repository link', testHeader);

  test('has scenes links', testScenesLinks);

  test('has external links', testExternalLinks);

  test('has no footer', async ({page}) => {
    await page.goto('/');

    const footer = page.getByRole('contentinfo');
    await expect(footer).not.toBeVisible();
  });
});

async function testMetadata({page}: {page: Page}) {
  await page.goto('/');
  await expectTitle({page, value: 'satelllte/space'});
  await expectDescription({
    page,
    value:
      "The creative space of @satelllte's software engineer. Three.js, React Three Fiber (R3F), Shaders, WebGL, WebGPU, and beyond.",
  });
}

async function testHeader({page}: {page: Page}) {
  await page.goto('/');

  const header = page.getByRole('banner');
  await expect(header).toBeVisible();

  const link = header.getByRole('link', {
    name: 'GitHub repository',
    exact: true,
  });
  await expectExternalLink({link, href: 'https://github.com/satelllte/space'});
}

async function testScenesLinks({page}: {page: Page}) {
  await page.goto('/');

  const list = page.getByRole('list', {name: 'Scenes', exact: true});
  await expect(list).toBeVisible();
  await expect(list.getByRole('listitem')).toHaveCount(SCENES.length);

  for (const scene of SCENES) {
    const {name, href} = scene;
    const link = list.getByRole('link', {name, exact: true});
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', href);
    await expect(link).toHaveAttribute('target', '_self');
  }
}

async function testExternalLinks({page}: {page: Page}) {
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
}

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
