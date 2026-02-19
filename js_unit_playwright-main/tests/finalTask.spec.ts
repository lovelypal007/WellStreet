import{ expect, test } from "@playwright/test";
import  fs from "fs";
import path from "path";
const allLocators ={
    url: 'https://www.wikipedia.org/',
    searchInput: '[id="searchInput"]',
    searchLanguage: '[id="searchLanguage"]',
    submitButton: '[type="submit"]',
    toolsMenu: '[id="vector-page-tools-dropdown"]',
    downloadAsPdf: '[id="coll-download-as-rl"]',
    downloadButton: '[type="submit"]'
}
const value = {
    title:"Wikipedia",
    language: "English",
    searchTerm: "Albert Einstein",
    fileName: "Albert_Einstein.pdf"
}

test.beforeEach(async ({ page }) => {
  await page.goto(allLocators.url);
});
test.afterEach(async () =>{
    const filepath:string = path.join(process.cwd(), value.fileName);
    if(fs.existsSync(filepath)){
        fs.rmSync(filepath);
    }
    console.log('File removed successfully');
})
test('should download the file in english as pdf', async({page}) =>{
   await expect(page).toHaveTitle(value.title); 
    await page.locator(allLocators.searchLanguage).selectOption({label :value.language }); 
    await page.locator(allLocators.searchInput).fill(value.searchTerm); 
    await page.locator(allLocators.submitButton).click(); 
    await page.locator(allLocators.toolsMenu).click();
    await page.locator(allLocators.downloadAsPdf).click();
    
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator(allLocators.downloadButton).click()]);
    const filepath:string = path.join(process.cwd(), value.fileName);
    await download.saveAs(filepath);
     expect(fs.existsSync(filepath)).toBeTruthy();
});
