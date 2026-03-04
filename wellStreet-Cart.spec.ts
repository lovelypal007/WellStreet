import test from "playwright/test";
import { WellStreetCart } from "../pageObjects/wellStreet-HomePage";
import { SelectProgramePage } from "../pageObjects/wellStreet -SelectProgramePage";
import { AddCart } from "../pageObjects/wellStreet-AddCartPage";

test('Well street cart flow', async ({ page }) => {
    await page.goto('https://www.wallstreetprep.com/')
    const wellStreetHomepage = new WellStreetCart(page)
    const wellStreetProgramePage = new SelectProgramePage(page)
    const wellStreetAddToCartPage = new AddCart(page)
    await wellStreetHomepage.handleInitialPopUp()
    await wellStreetHomepage.hoverSelfStudy();
    await wellStreetHomepage.selectFirstProgram()
    await wellStreetProgramePage.verifyPagePrograme()
    await wellStreetProgramePage.clickOnAddToCartButton();
    await wellStreetAddToCartPage.goBackToHomePage();
    await wellStreetHomepage.openCart();
    await wellStreetAddToCartPage.verifyItemInCart();
    await wellStreetAddToCartPage.removeItemFromCart();
    await wellStreetAddToCartPage.verifyCartEmpty();

})