import type { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchResultHeading: Locator;
  readonly productCards: Locator;
  readonly itemsPerPageSelect: Locator;
  readonly paginationRange: Locator;
  readonly previousPageButton: Locator;
  readonly nextPageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchResultHeading = page.locator('#search-result-heading');
    this.productCards = page.locator('mat-card');
    this.itemsPerPageSelect = page.getByLabel('Items per page:');
    this.paginationRange = page.locator('.mat-paginator-range-label');
    this.previousPageButton = page.getByRole('button', { name: 'Previous page' });
    this.nextPageButton = page.getByRole('button', { name: 'Next page' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/#/');
  }
}
