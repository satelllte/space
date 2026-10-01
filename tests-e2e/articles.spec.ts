import {test, expect, type Page} from '@playwright/test';
import {
  expectDescription,
  expectIndexing,
  expectNoIndexing,
  expectTitle,
} from './_utils';
import {ARTICLES} from './_constants';

const SITE = 'https://satelllte.pages.dev';

for (const article of ARTICLES) {
  const {name, href, title, description, publishedAt, tags} = article;

  test.describe(href, () => {
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
      await expectIndexing({page});
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

test.describe('/articles/test/', () => {
  test('has no indexing', async ({page}) => {
    await page.goto('/articles/test/');
    await expectNoIndexing({page});
  });

  test('has tab order', async ({page, browserName}) => {
    await page.goto('/articles/test/');

    const tabKey = browserName === 'webkit' ? 'Alt+Tab' : 'Tab'; // webkit skips links on tab by default, alt+tab includes them

    const primaryNav = page.getByRole('navigation', {name: 'Primary'});
    await page.keyboard.press(tabKey);
    await expect(
      primaryNav.getByRole('link', {name: 'Home', exact: true}),
    ).toBeFocused();

    const tocNav = page.getByRole('navigation', {name: 'On this page'});
    for (const name of [
      'Text formatting',
      'Links',
      'Headings',
      'Heading 3',
      'Heading 3 (2)',
      'Lists',
      'Code blocks',
      'Callouts',
      'File tree',
      'Figures',
    ]) {
      await page.keyboard.press(tabKey);
      await expect(tocNav.getByRole('link', {name, exact: true})).toBeFocused();
    }

    const article = page.getByRole('article');
    await page.keyboard.press(tabKey);
    await expect(
      article
        .getByRole('heading', {name: 'Text formatting', level: 2})
        .getByRole('link'),
    ).toBeFocused();

    // skip the rest of the article until the footer is reached
    const themeToggle = page
      .getByRole('contentinfo')
      .getByLabel(/Switch to (dark|light) theme/);
    const maxTabs = 100;
    for (let i = 0; i < maxTabs; i++) {
      await page.keyboard.press(tabKey);
      if (await themeToggle.evaluate((el) => el === document.activeElement)) {
        break;
      }
      expect(
        await article.evaluate((el) => el.contains(document.activeElement)),
      ).toBe(true);
    }

    await expect(themeToggle).toBeFocused();
  });

  test('matches snapshot @visual', async ({page}) => {
    await page.goto('/articles/test/');
    await waitBeforeSnapshot(page);
    await expect(page).toHaveScreenshot({fullPage: true});
  });

  test('matches snapshot dark @visual', async ({page}) => {
    await page.goto('/articles/test/');
    await page.getByLabel('Switch to dark theme').click();
    await waitBeforeSnapshot(page);
    await expect(page).toHaveScreenshot({fullPage: true});
  });

  async function waitBeforeSnapshot(page: Page) {
    // wait for all images to be loaded
    const images = await page.getByRole('img').all();
    for (const img of images) {
      await img.scrollIntoViewIfNeeded();
    }
    await page.waitForFunction(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.every((img) => img.complete);
    });

    // scroll to top so sticky elements will stay on their initial positions
    await page.evaluate(() => window.scrollTo(0, 0));
  }
});
