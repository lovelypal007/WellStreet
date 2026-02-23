import { expect, Page } from "@playwright/test";

export class BasePage {
     protected page: Page;
    constructor(page: Page){
        this.page = page;
    }
    public async verifyPageIsDisplayed(expectedTitle: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle);
    }
}