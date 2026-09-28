import {test, expect, type ConsoleMessage} from '@playwright/test';
import {SCENES} from './_constants';

test('logs "hello" message only once per session', async ({page}) => {
  const TEXT =
    'Hello and welcome :)\nFeel free to check out the source code:\nhttps://github.com/satelllte/space';

  const logs: ConsoleMessage[] = [];

  page.on('console', (log) => {
    if (log.text() !== TEXT) return;
    logs.push(log);
  });

  expect(logs.length).toEqual(0);

  await page.goto('/');
  expect(logs.length).toEqual(1);

  for (const scene of SCENES) {
    const {name, href} = scene;
    await page.getByRole('link', {name, exact: true}).click();
    await expect(page).toHaveURL(href);

    await page.getByRole('link', {name: 'Go back', exact: true}).click();
    await expect(page).toHaveURL('/');
  }

  expect(logs.length).toEqual(1);
  const log = logs[0];
  expect(log?.type()).toEqual('info');
  expect(log?.text()).toEqual(TEXT);
});
