import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class SteamSearchPage extends BasePage {
    public searchResultList: Locator;
    constructor(page: Page) {
        super(page);
        this.searchResultList = page.locator('#search_result_container');
    }
    public async getResultTitle(index: number, expectedTitle: string):Promise<string> {
        const result = this.searchResultList.locator("a").nth(index);
        await expect(result).toContainText(expectedTitle);
        const titleText:string[] = (await result.innerText()).split('\n');
        return titleText[index];
    }
    public async clickOnResult(index: number):Promise<void> {
        const result = this.searchResultList.locator("a").nth(index);
        await result.click();
    }
}