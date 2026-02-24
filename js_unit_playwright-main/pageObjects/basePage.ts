import { expect, Page } from "@playwright/test";

 export abstract class BasePage {
    constructor(protected page: Page,protected pageName:string){
        this.page = page;
        this.pageName = pageName;
    }
    public async verifyPageIsDisplayed(expectedTitle: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle);
    }
}