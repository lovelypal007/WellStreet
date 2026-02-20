import { expect, test } from "@playwright/test";
import { SearchNavigate } from "../pageObjects/steamHomePage";
import { SearchResults } from "../pageObjects/steamSearchPage";
import { GamePage } from "../pageObjects/steamGamePage";
import { AboutPage } from "../pageObjects/steamAboutPage";

const testData = {
  gameName: "The Stanley Parable",
  gameTitle: "The Stanley Parable on Steam",
  aboutPageTitle: "Steam, The Ultimate Online Game Platform",
  indexNumber: 0
}
test('should navigate to Steam About page from the main page ', async ({ page }) => {
  const steam = new SearchNavigate(page);
  const searchList = new SearchResults(page);
  const gamePage = new GamePage(page);
  const aboutpage = new AboutPage(page);
  await steam.navigateToPage();
  await steam.searchForGame(testData.gameName);
  const firstResult = await searchList.getResultTitle(testData.indexNumber, testData.gameName);
  await searchList.getResultTitle(testData.indexNumber, testData.gameName);
  await searchList.clickOnResult(testData.indexNumber);
  await gamePage.gamePageIsDisplayed(testData.gameTitle);
  const gameName = await gamePage.getGameName();
  expect(gameName).toBe(firstResult);
  await gamePage.clickDownloadButton();
  await gamePage.clickGotSteamButton();
  await aboutpage.aboutPageIsDisplayed(testData.aboutPageTitle);
  await aboutpage.clickInstallSteamButton();
  await aboutpage.comparegamersCount();
});
