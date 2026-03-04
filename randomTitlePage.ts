import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class RandomTitlePage extends BasePage {
    public titleName :Locator
    public expanedContainer:Locator
    public activeItem :Locator
    constructor(page: Page) {
        super(page, "left side page");
        this.titleName = page.locator('[class="wspl-banner__title wspl-banner__title--md --text-white"]')
        this.expanedContainer = page.locator('.wsp-guide__block.expanded')
        this.activeItem = page.locator('.wsp-guide__item--current-post')
    }
    async verifyPageTitle(expectedTitle: string): Promise<void> {
                await expect(this.titleName).toBeVisible();

        const actualTitle = await this.titleName.innerText();

        console.log(actualTitle)
        expect(actualTitle).toContain(expectedTitle)
    }
    async verifySidebarState(expectedText: string): Promise<void> {
    const sidebarContainer = this.expanedContainer
    await expect(sidebarContainer).toBeVisible();
    const activeItem = this.activeItem
    await expect(activeItem).toContainText(expectedText);
    await expect(activeItem).toHaveAttribute('aria-current', 'true');
}
}