import type { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchResultHeading: Locator;
  readonly productCards: Locator;
  readonly itemsPerPageSelect: Locator;
  readonly paginationRange: Locator;
  readonly previousPageButton: Locator;
  readonly nextPageButton: Locator;
  readonly welcomeBannerHeading: Locator;
  readonly helpGettingStartedButton: Locator;
  readonly dismissWelcomeBannerButton: Locator;
  readonly cookieConsentDialog: Locator;
  readonly dismissCookieButton: Locator;
  readonly forcePageReloadButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchResultHeading = page.locator('#search-result-heading');
    this.productCards = page.locator('mat-card');
    this.itemsPerPageSelect = page.getByLabel('Items per page:');
    this.paginationRange = page.locator('.mat-paginator-range-label');
    this.previousPageButton = page.getByRole('button', { name: 'Previous page' });
    this.nextPageButton = page.getByRole('button', { name: 'Next page' });
    this.welcomeBannerHeading = page.getByRole('heading', { name: 'Welcome to OWASP Juice Shop!' });
    this.helpGettingStartedButton = page.getByRole('button', { name: 'Help getting started' });
    this.dismissWelcomeBannerButton = page.getByRole('button', { name: 'Close Welcome Banner' });
    this.cookieConsentDialog = page.getByLabel('cookieconsent');
    this.dismissCookieButton = page.getByRole('button', { name: 'dismiss cookie message' });
    this.forcePageReloadButton = page.getByRole('button', { name: 'Force page reload' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/#/');
  }

  async dismissDialogs(): Promise<void> {
    await this.dismissWelcomeBannerButton.click();
    await this.welcomeBannerHeading.waitFor({ state: 'hidden' });
    await this.dismissCookieButton.click();
    await this.cookieConsentDialog.waitFor({ state: 'hidden' });
    await this.forcePageReloadButton.click();
    await this.forcePageReloadButton.waitFor({ state: 'hidden' });
  }
}
