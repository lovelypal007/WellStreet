// @ts-check
import { test, expect } from '@playwright/test';

const successfulMessage: string = 'You successfully clicked an alert';

test.beforeEach(async ( { page }) => {
  await page.goto('https://the-internet.herokuapp.com');
});

test('successful message should be displayed after alert handling', async ({ page }) => {
  await page.locator('[href="/javascript_alerts"]').click();

  // accept alert
    page.on('dialog',dialog =>dialog.accept());
  await page.locator('[onclick="jsAlert()"]').click();
  // expect that successfulMessage is displayed
    await expect(page.locator('[id="result"]')).toHaveText(successfulMessage);
});
