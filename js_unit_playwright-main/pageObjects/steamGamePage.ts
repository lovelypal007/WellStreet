import { expect, Locator, Page } from "@playwright/test";

export class GamePage {
    public gameName: Locator;
    public downloadButton: Locator;
    public gotSteamButton: Locator
    constructor(public page: Page) {
        this.page = page;
        this.gameName = page.locator('[id="appHubAppName"]');
        this.downloadButton = page.locator('[id="demoGameBtn"]');
        this.gotSteamButton = page.locator('[class="btn_blue"]');
    }
    async gamePageIsDisplayed(gameTitle: string) {
        await expect(this.page).toHaveTitle(gameTitle);
    }
    async getGameName() {
        await this.gameName.waitFor();
        const gameName = await this.gameName.textContent();
        console.log(gameName);
        return gameName;
    }

    async clickDownloadButton() {
        await this.downloadButton.waitFor();
        await this.downloadButton.click();
    }
    async clickGotSteamButton() {
        await this.gotSteamButton.waitFor();
        await this.gotSteamButton.click();
    }
}