//@ts-check
import{ expect, test } from "@playwright/test";
import { existsSync, rmSync } from "fs";
import path from "path/win32";

const allLocators ={
    url: 'https://www.wikipedia.org/',
    searchInput: '[id="searchInput"]',
    searchLanguage: '[id="searchLanguage"]',
    submitButton: '[type="submit"]',
    toolsMenu: '[id="vector-page-tools-dropdown"]',
    downloadAsPdf: '[id="coll-download-as-rl"]',
    downloadButton: '[type="submit"]'
}
const Value = {
    title:"Wikipedia",
    language: "English",
    searchTerm: "Albert Einstein",
    FileName: "Albert_Einstein.pdf"
}

test.beforeEach(async ({ page }) => {
  await page.goto(allLocators.url);
});
test.afterEach(async () =>{
    const filepath:string = path.join(process.cwd(), Value.FileName);
    if(existsSync(filepath)){
        rmSync(filepath);
    }
    console.log('File removed successfully');
})
test('should download the file in english as pdf', async({page}) =>{
   expect(page).toHaveTitle(Value.title); 
    await page.locator(allLocators.searchLanguage).selectOption({label :Value.language }); 
    await page.locator(allLocators.searchInput).fill(Value.searchTerm); 
    await page.locator(allLocators.submitButton).click(); 
    await page.locator(allLocators.toolsMenu).click();
    await page.locator(allLocators.downloadAsPdf).click();
    await page.locator(allLocators.downloadButton).click();

    const downloadpromise:Promise<any> = page.waitForEvent('download');
    const download = await downloadpromise;
    const filepath:string = path.join(process.cwd(), Value.FileName);
    await download.saveAs(filepath);
    expect(existsSync(filepath)).toBeTruthy();
});
