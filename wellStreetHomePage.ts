import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class WellStreetHomePage extends BasePage {
    public searchInput:Locator
    public showAllResults:Locator
    constructor(page:Page) {
        super(page,"wellstreet homepage");
        this.searchInput = page.locator('input[type="search"]:visible');
        this.showAllResults = page.locator('[class="resultsMore"]  ');
    }
    async searchForArticle(articleName: string):Promise<void> {
        await this.searchInput.click();
        await this.searchInput.pressSequentially(articleName,{delay:100});
    }
   
    async clickShowAllResults():Promise<void> {
        await this.showAllResults.click();
    }
}