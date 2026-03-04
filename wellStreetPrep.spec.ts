import { test } from "@playwright/test";
import { WellStreetHomePage } from "../pageObjects/wellStreetHomePage";
import { SearchResultPage } from "../pageObjects/searchResultPage";
import { RandomTitlePage } from "../pageObjects/randomTitlePage";

const testData: { searchInput: string; totalPage: number } = {
   searchInput: 'Real Estate',
   totalPage: 159
}
test('should matched the article title the one we selected', async ({ page }) => {
   await page.goto('https://www.wallstreetprep.com/');
   const articleTitle = new WellStreetHomePage(page);
   const searchReasult = new SearchResultPage(page);
   const checkLeftMenu = new RandomTitlePage(page);
   await articleTitle.handleInitialPopUp();
   await searchReasult.handleInitialPopUp();
   await articleTitle.handleInitialPopUp();
   await articleTitle.searchForArticle(testData.searchInput);
   await articleTitle.clickShowAllResults();
   const expectedTitle = await searchReasult.clickRandomResultFromAllPages(testData.totalPage);
   await checkLeftMenu.verifyPageTitle(expectedTitle);
   await checkLeftMenu.verifySidebarState(expectedTitle);
})