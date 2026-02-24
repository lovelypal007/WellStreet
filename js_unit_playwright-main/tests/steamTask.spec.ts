import { expect, test } from "@playwright/test";
import { SteamHomePage } from "../pageObjects/steamHomePage";
import { SteamGamePage } from "../pageObjects/steamGamePage";
import { SteamAboutPage } from "../pageObjects/steamAboutPage";


const testData: { gameName: string, gameTitle: string, aboutPageTitle: string } = {
  gameName: "The Stanley Parable",
  gameTitle: "The Stanley Parable on Steam",
  aboutPageTitle: "Steam, The Ultimate Online Game Platform"
};
const testData2: { indexNumber: number, text: string }[] = [
  { indexNumber: 0, text: "The Stanley Parable" }, { indexNumber: 2, text: "The Stanley Parable Demo" }
];

test('should navigate to Steam About page from the main page ', async ({ page }) => {
  const steam = new SteamHomePage(page);
  const gamePage = new SteamGamePage(page);
  const aboutPage = new SteamAboutPage(page);

  await page.goto("https://store.steampowered.com/");
  await steam.searchForGame(testData.gameName);

  for (const item of testData2) {
    const resultText = await steam.getResultsText(item.indexNumber);
    expect(resultText).toBe(item.text);
  }
  await steam.clickOnFirstResult(testData2[0].indexNumber);

  await gamePage.verifyPageIsDisplayed(testData.gameTitle);
  const gameName = await gamePage.getGameName();

  expect(gameName).toBe(testData2[0].text);

  await gamePage.clickDownloadButton();
  await gamePage.clickGotSteamButton();

  await aboutPage.verifyPageIsDisplayed(testData.aboutPageTitle);
  await aboutPage.checkInsatallButtonIsClickable();

  const checkCounts = await aboutPage.compareGamersCount();
  expect(checkCounts.inGameCount).toBeLessThan(checkCounts.onlineCount);
});
