import {test, expect, type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {SCENES} from './_constants';

test("shouldn't have any auto detectable issues (home)", async ({page}) => {
  await page.goto('/');
  await expectNoIssues({page});
});

test("shouldn't have any auto detectable issues (error)", async ({page}) => {
  await page.goto('/unknown');
  await expectNoIssues({page});
});

test("shouldn't have any auto detectable issues (scenes)", async ({page}) => {
  test.fixme(); // TODO: fix issues

  for (const scene of SCENES) {
    const {href} = scene;
    await page.goto(href);
    await expectNoIssues({page});
  }
});

const expectNoIssues = async ({page}: {page: Page}) => {
  const results = await new AxeBuilder({page}).analyze();
  expect(results.violations).toEqual([]);
};
