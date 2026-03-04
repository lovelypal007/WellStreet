import { Locator, Page } from "playwright-core";
import { BasePage } from "./basePage";

export class WellStreetCart extends BasePage {
    public selfStudy: Locator
    public selectAnyPrograme: Locator
    public cartLogo: Locator
    constructor(page: Page) {
        super(page, 'wellstreet cart page')
        this.selfStudy = page.locator('//*[@id="navCourses"]/a')
        this.selectAnyPrograme = page.getByRole('link', { name: /Premium Package/i }).first();
        this.cartLogo = page.locator('//*[@id="cart-link"]/a')
    }
    public async hoverSelfStudy() {
        await this.selfStudy.hover();
    }
    public async selectFirstProgram() {
        await this.selectAnyPrograme.click();
    }
    public async openCart() {
        await this.cartLogo.waitFor({state:"visible",timeout:6000});
        await this.cartLogo.click();
    }
}