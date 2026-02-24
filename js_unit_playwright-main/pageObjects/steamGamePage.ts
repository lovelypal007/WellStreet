import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class SteamGamePage extends BasePage {
    public gameName: Locator;
    public downloadButton: Locator;
    public gotSteamButton: Locator
    constructor(page: Page) {
        super(page,"Steam game page");
        this.gameName = page.locator('[id="appHubAppName"]');
        this.downloadButton = page.locator('[id="demoGameBtn"]');
        this.gotSteamButton = page.locator('[class="btn_blue"]');
    }

    public async getGameName():Promise<string> {
        const gameName = await this.gameName.textContent();
        return gameName || "";
    }

    public async clickDownloadButton():Promise<void> {
        await this.downloadButton.click();
    }
    public async clickGotSteamButton():Promise<void> {
        await this.gotSteamButton.click();
    }
}