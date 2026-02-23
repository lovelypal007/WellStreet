import { Locator, Page } from "@playwright/test";

export class SteamHomePage {
  public searchInput: Locator;
  constructor(public page: Page) {
    this.searchInput = page.locator('[type="text"]');
  }

  public async navigateToPage() {
    await this.page.goto("https://store.steampowered.com/");
  }
  public async searchForGame(gameName: string): Promise<void> {
    await this.searchInput.fill(gameName);
    await this.searchInput.press('Enter');
  }
}
