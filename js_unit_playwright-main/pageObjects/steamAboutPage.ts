import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class SteamAboutPage extends BasePage {
    public steamInstallButton: Locator;
    public onlineGammerscount: Locator;
    public playingGamerscount: Locator;
    constructor(page:Page) {
        super(page);
        this.steamInstallButton = page.locator('a.about_install_steam_link:visible');
        this.onlineGammerscount = page.locator('.online_stat:has(.gamers_online)');
        this.playingGamerscount = page.locator('.online_stat:has(.gamers_in_game)');
    }

    public async clickInstallSteamButton(): Promise<void>{
        await expect(this.steamInstallButton.first()).toBeEnabled();
    }
    public async compareGamersCount():Promise<void> {
        const onlineCount = Number((await this.onlineGammerscount.textContent())?.replace(/[^0-9]/g, ''));
        const inGameCount = Number((await this.playingGamerscount.textContent())?.replace(/[^0-9]/g, ''));
        expect(inGameCount).toBeLessThan(onlineCount);
    }
}