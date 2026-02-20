import { expect, Locator, Page } from "@playwright/test";

export class SearchResults {
    public searchResultList: Locator;
    constructor(public page: Page) {
        this.searchResultList = page.locator('#search_result_container');
    }
    async getResultTitle(index: number, expectedTitle: string) {
        const result = this.searchResultList.locator("a").nth(index);

        await expect(result).toContainText(expectedTitle);

        const titleText = (await result.innerText()).split('\n')[index];
        console.log(titleText);
        return titleText;
    }
    async clickOnResult(index: number) {
        const result = this.searchResultList.locator("a").nth(index);
        await result.click();
    }
}