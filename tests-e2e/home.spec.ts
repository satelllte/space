import {test, expect, type Page, type Locator} from '@playwright/test';

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

const expectTitle = async ({page, value}: {page: Page; value: string}) => {
  await expect(page).toHaveTitle(value);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    value,
  );
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
    'content',
    value,
  );
};

const expectDescription = async ({
  page,
  value,
}: {
  page: Page;
  value: string;
}) => {
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    value,
  );
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    'content',
    value,
  );
  await expect(
    page.locator('meta[name="twitter:description"]'),
  ).toHaveAttribute('content', value);
};

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
