import { Locator, Page } from "playwright-core";
import { BasePage } from "./basePage";
import { expect } from "playwright/test";

export class SelectProgramePage extends BasePage {
    public addToCart: Locator
    constructor(page: Page) {
        super(page, ' selectPrograme page')
        this.addToCart = page.locator('//*[@id="sales-banner"]/div/div/div[1]/div[2]/div/a')
    }
    public async verifyPagePrograme() {
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(/.*self-study-programs\/premium-package/);
    }
    public async clickOnAddToCartButton() {
        await this.addToCart.waitFor({state:"visible",timeout:6000});
        await this.addToCart.click();
    }
}