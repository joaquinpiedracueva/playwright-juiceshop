import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly searchResultHeading: Locator;
  readonly productCards: Locator;
  readonly itemsPerPageSelect: Locator;
  readonly paginationRange: Locator;
  readonly previousPageButton: Locator;
  readonly nextPageButton: Locator;
  readonly welcomeBannerHeading: Locator;
  readonly helpGettingStartedButton: Locator;

  constructor(page: Page) {
    super(page);
    this.searchResultHeading = page.locator('#search-result-heading');
    this.productCards = page.locator('mat-card');
    this.itemsPerPageSelect = page.getByLabel('Items per page:');
    this.paginationRange = page.locator('.mat-paginator-range-label');
    this.previousPageButton = page.getByRole('button', { name: 'Previous page' });
    this.nextPageButton = page.getByRole('button', { name: 'Next page' });
    this.welcomeBannerHeading = page.getByRole('heading', { name: 'Welcome to OWASP Juice Shop!' });
    this.helpGettingStartedButton = page.getByRole('button', { name: 'Help getting started' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/#/');
  }
}
