import {expect, type Page} from '@playwright/test';

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
