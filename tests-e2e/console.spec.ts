import {test, expect, type ConsoleMessage} from '@playwright/test';

test('logs "hello" message only once per session', async ({page}) => {
  const logs: ConsoleMessage[] = [];
  page.on('console', (log) => {
    if (log.text() === 'Successfully preconnected to https://rsms.me/') return;
    logs.push(log);
  });
  await expect(logs.length).toEqual(0);

  await page.goto('/');
  await expect(logs.length).toEqual(1);

  await page.getByRole('link', {name: 'Particles', exact: true}).click();
  await expect(page).toHaveURL('/scenes/particles');
  await expect(logs.length).toEqual(1);

  await page.getByRole('link', {name: '<- Back', exact: true}).click();
  await expect(page).toHaveURL('/');
  await expect(logs.length).toEqual(1);

  const log = logs[0];
  await expect(log?.type()).toEqual('info');
  await expect(log?.text()).toEqual(
    'Hello and welcome :)\nFeel free to check out the source code:\nhttps://github.com/satelllte/space',
  );
});
