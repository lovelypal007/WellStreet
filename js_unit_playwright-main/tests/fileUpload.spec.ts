// @ts-check
import { test, expect } from '@playwright/test';
import path from 'path';

const fileName:string = 'test.txt';
const fullPathToFile = path.resolve(`./uploads/${fileName}`);

test.beforeEach(async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com');
});

test('file should be uploaded', async ({ page }) => {
  await page.locator('[href="/upload"]').click();

  // upload file with fullPathToFile path
  await page.locator('[id="file-upload"]').setInputFiles(fullPathToFile);
  await page.locator('#file-submit').click();

  const uploadedFiles = page.locator('#uploaded-files');
  // expect that fileName on Upload page is correct
   await expect(uploadedFiles).toHaveText(fileName);
});
