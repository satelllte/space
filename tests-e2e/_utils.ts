import {expect, type Page} from '@playwright/test';

export const expectNoIndexing = async ({
  page,
  noFollow = false,
}: {
  page: Page;
  noFollow?: boolean;
}) => {
  const content = noFollow ? 'noindex' : 'noindex, nofollow';
  await expect(
    page.locator(`meta[name="robots"][content="${content}"]`),
  ).toHaveCount(1);
};

export const expectIndexing = async ({page}: {page: Page}) => {
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
};

export const expectTitle = async ({
  page,
  value,
}: {
  page: Page;
  value: string;
}) => {
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

export const expectDescription = async ({
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
