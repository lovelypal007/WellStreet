import { Locator, Page } from "playwright-core";
import { BasePage } from "./basePage";
import { expect } from "playwright/test";

export class AddCart extends BasePage {
    public homePageLogo: Locator
    public cartItem: Locator
    public removeLink: Locator

    constructor(page: Page) {
        super(page, 'Add to cart page')
        this.homePageLogo = page.locator('//*[@id="wsp-logo"]')
        this.cartItem = page.locator('//*[@id="BRIEF_PRODUCT_SUMMARY"]//p[contains(text(),Premium)]').first();
        this.removeLink = page.getByRole('link', { name: 'Remove' })
    }
    public async goBackToHomePage() {
        await this.homePageLogo.waitFor({state:"visible" ,timeout : 6000});
        await this.homePageLogo.click();
    }
    public async verifyItemInCart() {
        await this.cartItem.waitFor({state:"visible", timeout :6000});
        await expect(this.cartItem).toBeVisible();
    }
    public async removeItemFromCart() {
        await this.removeLink.click();
        await this.cartItem.waitFor({ state: 'detached', timeout: 10000 });

    }
    public async verifyCartEmpty() {
        await expect(this.cartItem).toBeHidden();

    }
}