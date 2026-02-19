// @ts-check
import { test, expect } from '@playwright/test';

const randomString: string = crypto.randomUUID();

test.beforeEach(async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com');
});

test('populated text should be displayed in dynamic control', async ({ page }) => {
  await page.locator('//*[@href="/dynamic_controls"]').click();

  await page.locator('//button[text() = "Enable"]').click();

  const inputField = page.locator('#input-example input');

  // expect that inputField is enabled
  await page.locator('[id="message"]').waitFor();
  await expect(inputField).toBeEnabled();
  // input randomString into inputField
  await inputField.fill(randomString)
  // expect that randomString is displayed
  await expect(inputField).toHaveValue(randomString);
});
