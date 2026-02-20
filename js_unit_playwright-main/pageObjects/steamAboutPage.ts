import { expect, Locator, Page } from "@playwright/test";

export class AboutPage {
    public steamInstallButton: Locator;
    public onlinegammerscount: Locator;
    public playinggamerscount: Locator;
    constructor(public page: Page) {
        this.page = page;
        this.steamInstallButton = page.locator('a.about_install_steam_link:visible');
        this.onlinegammerscount = page.locator('.online_stat:has(.gamers_online)');
        this.playinggamerscount = page.locator('.online_stat:has(.gamers_in_game)');
    }
    async aboutPageIsDisplayed(aboutPageTitle: string) {
        await expect(this.page).toHaveTitle(aboutPageTitle);
    }
    async clickInstallSteamButton() {
        await this.steamInstallButton.first().waitFor();
        await expect(this.steamInstallButton.first()).toBeEnabled();
    }
    async comparegamersCount() {
        const onlineCount = Number((await this.onlinegammerscount.textContent())?.replace(/[^0-9]/g, ''));
        const inGameCount = Number((await this.playinggamerscount.textContent())?.replace(/[^0-9]/g, ''));
        expect(inGameCount).toBeLessThan(onlineCount);
    }
}