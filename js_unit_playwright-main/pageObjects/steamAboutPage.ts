import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { Parser } from "../utils/parser";

export class SteamAboutPage extends BasePage {
    public steamInstallButton: Locator;
    public onlineGammersCount: Locator;
    public playingGamersCount: Locator;
    constructor(page:Page) {
        super(page,"Steam about page");
        this.steamInstallButton = page.locator('a.about_install_steam_link:visible');
        this.onlineGammersCount = page.locator('.online_stat:has(.gamers_online)');
        this.playingGamersCount = page.locator('.online_stat:has(.gamers_in_game)');
    }

    public async checkInsatallButtonIsClickable(): Promise<void>{
        await expect(this.steamInstallButton.first()).toBeEnabled();
    }
    public async compareGamersCount():Promise<{ onlineCount: number; inGameCount: number }> {
        const onlineCount = Parser.extractNumberFromText(await this.onlineGammersCount.textContent());
        const inGameCount = Parser.extractNumberFromText(await this.playingGamersCount.textContent());
        return { onlineCount, inGameCount };
    }
}