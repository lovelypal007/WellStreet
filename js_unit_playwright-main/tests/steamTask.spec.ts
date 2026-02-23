import { expect, test } from "@playwright/test";
import { SteamHomePage } from "../pageObjects/steamHomePage";
import { SteamSearchPage } from "../pageObjects/steamSearchPage";
import { SteamGamePage } from "../pageObjects/steamGamePage";
import { SteamAboutPage } from "../pageObjects/steamAboutPage";

const testData: { gameName:string,gameTitle:string,aboutPageTitle:string,indexNumber:number } = {
  gameName: "The Stanley Parable",
  gameTitle: "The Stanley Parable on Steam",
  aboutPageTitle: "Steam, The Ultimate Online Game Platform",
  indexNumber: 0
}
test('should navigate to Steam About page from the main page ', async ({ page }) => {
  const steam = new SteamHomePage(page);
  const searchList = new SteamSearchPage(page);
  const gamePage = new SteamGamePage(page);
  const aboutPage = new SteamAboutPage(page);

  await steam.navigateToPage();
  await steam.searchForGame(testData.gameName);

  const firstResult = await searchList.getResultTitle(testData.indexNumber, testData.gameName);
  await searchList.clickOnResult(testData.indexNumber);

  await gamePage.verifyPageIsDisplayed(testData.gameTitle);
  const gameName = await gamePage.getGameName();

  expect(gameName).toBe(firstResult);

  await gamePage.clickDownloadButton();
  await gamePage.clickGotSteamButton();
  
  await aboutPage.verifyPageIsDisplayed(testData.aboutPageTitle);
  await aboutPage.clickInstallSteamButton();
  await aboutPage.compareGamersCount();
});
