import { expect, Locator, Page } from "@playwright/test";

export class SteamHomePage {
  public searchInput: Locator;
  public searchDropdownResultList: Locator;
  constructor(public page: Page) {
    this.searchInput = page.locator('[type="text"]');
    this.searchDropdownResultList = page.locator('[id^="searchSuggestions_"] a[href*="/app/"]');
  }

  public async navigateToPage() {
    await this.page.goto("https://store.steampowered.com/");
  }
  public async searchForGame(gameName: string): Promise<void> {
    await this.searchInput.fill(gameName);
  }
   async getResultsText(indexnumber:number): Promise<string> {
    const results =(await this.searchDropdownResultList.nth(indexnumber).innerText()).split('\n');
    console.log(results[indexnumber]);
    return results[indexnumber];

  }
  async clickOnFirstResult(index: number): Promise<void> {
    await this.searchDropdownResultList.nth(index).click();
  }}
