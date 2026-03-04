import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class SearchResultPage extends BasePage {
  public searchResultList: Locator;
  public searchPagination: Locator;
  public searchPaginationList: Locator;
  constructor(page: Page) {
    super(page, "search results page");
    this.searchResultList = page.locator('div.search-results-row.siq-single-result');
    this.searchPagination = page.locator('._siq_pagination');
    this.searchPaginationList = page.locator('.siq-pagination-list-item')
  }
  async clickRandomResultFromAllPages(totalResults: number): Promise<string> {
    const itemsPerPage = 10;
    const targetIndex = Math.floor(Math.random() * totalResults);
    const targetPage = Math.floor(targetIndex / itemsPerPage) + 1;
    const relativeIndex = targetIndex % itemsPerPage;


    await this.searchPagination.waitFor({ state: 'attached', timeout: 60000 });

    if (targetPage > 1) {
      const pageLink = this.searchPaginationList.filter({ hasText: String(targetPage) }).first();
      if (await pageLink.count() > 0) {
        await Promise.all([this.page.waitForLoadState('networkidle'),pageLink.click()]);
      } else {

        const paginationLinks = await this.page.$$('.siq-pagination-list-item');
        for (const link of paginationLinks) {
          const text = (await link.textContent())?.trim();
          if (text === targetPage.toString()) {
            await link.click();
            break;
          }
        }

        await this.page.waitForLoadState('networkidle');
      }
    }

    await this.searchResultList.first().waitFor({ state: 'visible', timeout: 60000 });

    const resultsOnPage = await this.searchResultList.count();
    const safeIndex = Math.min(relativeIndex, resultsOnPage - 1);
    const resultRow = this.searchResultList.nth(safeIndex);
    const articleLink = resultRow.locator('.search-results-title a, a').first();

    const expectedTitle = (await articleLink.innerText()).trim();

    await articleLink.waitFor({ state: 'visible', timeout: 60000 });
    await Promise.all([this.page.waitForLoadState('domcontentloaded'), articleLink.click()
    ]);

    return expectedTitle;
  }

}