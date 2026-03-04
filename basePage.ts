import { Locator, Page } from "@playwright/test";

 export abstract class BasePage {
    public popBtn :Locator
    constructor(protected page: Page,protected pageName:string){
        this.page = page;
        this.pageName = pageName;
        this.popBtn = page.locator('svg.w-6.h-6')
        }
         public async handleInitialPopUp(): Promise<void> {
    const popupCloseBtn = this.popBtn;
    try {
        await popupCloseBtn.waitFor({ state: 'visible', timeout: 5000 });
        await popupCloseBtn.click();
    } catch (e){}    
}
}