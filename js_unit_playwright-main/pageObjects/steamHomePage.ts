import { Locator, Page } from "@playwright/test";

export class SearchNavigate {
  public searchInput: Locator;
  constructor(public page: Page) {
    this.searchInput = page.locator('[type="text"]');
  }

  async navigateToPage() {
    await this.page.goto("https://store.steampowered.com/");
  }
  async searchForGame(gameName: string) {
    await this.searchInput.fill(gameName);
    await this.searchInput.press('Enter');
  }
}
