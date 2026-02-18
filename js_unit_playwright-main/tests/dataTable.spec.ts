// @ts-check
import { test, expect } from '@playwright/test';

const expectedSum:number = 251;
const currencySign:string = '$';

test.beforeEach(async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com');
});

test('sum of Due values should be correct', async ({ page }) => {
  await page.locator('[href="/tables"]').click();
  await page.locator('#table1').waitFor();
  // get Due column elements
    const dueItems = page.locator('//*[@id="table1"]//td[4]');
  let actualSum = 0;

  for (let i = 0; i < await dueItems.count(); i++) {
    // get value in the column
    await dueItems.nth(i).waitFor();
    const value = await dueItems.nth(i).innerText();
    // increase actualSum with value without currencySign
    actualSum += parseFloat(value?.replace(currencySign, '') || '0');
  }

  expect(actualSum).toEqual(expectedSum);
});
