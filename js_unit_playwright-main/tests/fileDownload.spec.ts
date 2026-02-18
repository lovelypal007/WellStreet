// @ts-check
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const fileName: string = "test.txt";
const downloadDir = path.join(process.cwd(), 'downloads');

test.beforeEach(async ({ page }) => {
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
  }

  await page.goto('https://the-internet.herokuapp.com');
});

test('file should be downloaded', async ({ page }) => {
  await page.locator('[href="/download"]').click();
  
  const fileLink = page.locator(`[href="download/${fileName}"]`);
  const downloadedFilePath = path.join(downloadDir, fileName);

  // wait until the file is fully downloaded along the specific downloadedFilePath
  const [ download] = await Promise.all([page.waitForEvent('download'),fileLink.click()]);
  await download.saveAs(downloadedFilePath);
  // assert that file downloaded
expect(fs.existsSync(downloadedFilePath)).toBeTruthy();
});

test.afterAll(() => {
  fs.rmSync(downloadDir, { recursive: true, force: true });
});
