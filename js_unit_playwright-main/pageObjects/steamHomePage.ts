import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { Parser } from "../utils/parser";

export class SteamHomePage extends BasePage {
  public searchInput: Locator;
  public searchDropdownResultList: Locator;
  constructor(page: Page) {
    super(page, "Steam home page");
    this.searchInput = page.locator('[type="text"]');
    this.searchDropdownResultList = page.locator('[id^="searchSuggestions_"] a[href*="/app/"]');
  }

  public async searchForGame(gameName: string): Promise<void> {
    await this.searchInput.fill(gameName);
  }
  public async getResultsText(indexnumber: number): Promise<string> {
    const element = this.searchDropdownResultList.nth(indexnumber);
    const rawText = Parser.getFirstLine(await element.innerText());
    return rawText;
  }
  public async clickOnFirstResult(index: number): Promise<void> {
    await this.searchDropdownResultList.nth(index).click();
  }
}
