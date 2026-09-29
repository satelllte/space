import {test, expect, type Page} from '@playwright/test';
import {expectDescription, expectTitle} from './_utils';
import {ARTICLES} from './_constants';

const SITE = 'https://satelllte.pages.dev';

for (const article of ARTICLES) {
  const {name, href, title, description, publishedAt, tags} = article;

  test.describe(name, () => {
    test('has metadata', async ({page}) => {
      await page.goto(href);
      await expectArticleMetadata({page});
    });

    test('has structured data', async ({page}) => {
      await page.goto(href);
      await expectStructuredData({page});
    });

    test('has landmarks and heading structure', async ({page}) => {
      await page.goto(href);

      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByRole('main')).toBeVisible();
      await expect(page.getByRole('contentinfo')).toBeVisible();

      const articleElement = page.getByRole('article', {name, exact: true});
      await expect(articleElement).toBeVisible();

      const h1 = page.getByRole('heading', {level: 1});
      await expect(h1).toHaveCount(1);
      await expect(h1).toHaveText(name);

      await expect(
        articleElement.getByRole('heading', {level: 2}).first(),
      ).toBeVisible();
    });

    test('has back link to home page', async ({page}) => {
      await page.goto(href);
      const nav = page.getByRole('navigation', {name: 'Primary'});
      await nav.getByRole('link', {name: 'Home', exact: true}).click();
      await expect(page).toHaveURL('/');
    });

    test('has linkable headings', async ({page}) => {
      await page.goto(href);
      const heading = page.getByRole('heading', {level: 2}).first();
      const id = await heading.getAttribute('id');
      expect(id).toBeTruthy();
      await expect(heading.getByRole('link')).toHaveAttribute('href', `#${id}`);
    });

    test('has theme toggle', async ({page}) => {
      await page.goto(href);
      const themeToggle = page.getByLabel(/Switch to (dark|light) theme/);
      await expect(themeToggle).toBeVisible();
    });

    test.describe('when JS is disabled', () => {
      test.use({javaScriptEnabled: false});

      test('has metadata', async ({page}) => {
        await page.goto(href);
        await expectArticleMetadata({page});
      });

      test('has structured data', async ({page}) => {
        await page.goto(href);
        await expectStructuredData({page});
      });

      test('has no theme toggle', async ({page}) => {
        await page.goto(href);

        const themeToggle = page.getByLabel(/Switch to (dark|light) theme/);
        await expect(themeToggle).not.toBeVisible();
      });
    });

    async function expectArticleMetadata({page}: {page: Page}) {
      await expectTitle({page, value: title});
      await expectDescription({page, value: description});
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `${SITE}${href}`,
      );
      await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
        'content',
        'article',
      );
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
        'content',
        `${SITE}${href}`,
      );
      await expect(
        page.locator('meta[property="article:published_time"]'),
      ).toHaveAttribute('content', `${publishedAt}T00:00:00.000Z`);
    }

    async function expectStructuredData({page}: {page: Page}) {
      const jsonLd = await page
        .locator('script[type="application/ld+json"]')
        .textContent();
      const data = JSON.parse(jsonLd ?? '{}');
      expect(data).toEqual({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        author: {
          '@type': 'Person',
          name: 'satelllte',
          url: 'https://github.com/satelllte',
        },
        dateModified: `${publishedAt}T00:00:00.000Z`,
        datePublished: `${publishedAt}T00:00:00.000Z`,
        description,
        headline: name,
        image: `${SITE}/assets/images/og.png`,
        keywords: tags.join(', '),
        mainEntityOfPage: {'@id': `${SITE}${href}`, '@type': 'WebPage'},
        url: `${SITE}${href}`,
      });
    }
  });
}
