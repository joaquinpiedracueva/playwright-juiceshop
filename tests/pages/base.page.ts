import type { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;
  readonly dismissWelcomeBannerButton: Locator;
  readonly cookieConsentDialog: Locator;
  readonly dismissCookieButton: Locator;
  readonly forcePageReloadButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dismissWelcomeBannerButton = page.getByRole('button', { name: 'Close Welcome Banner' });
    this.cookieConsentDialog = page.getByLabel('cookieconsent');
    this.dismissCookieButton = page.getByRole('button', { name: 'dismiss cookie message' });
    this.forcePageReloadButton = page.getByRole('button', { name: 'Force page reload' });
  }

  async dismissDialogs(): Promise<void> {
    await this.dismissWelcomeBannerButton.click();
    await this.dismissWelcomeBannerButton.waitFor({ state: 'hidden' });
    await this.dismissCookieButton.click();
    await this.cookieConsentDialog.waitFor({ state: 'hidden' });
    await this.forcePageReloadButton.click();
    await this.forcePageReloadButton.waitFor({ state: 'hidden' });
  }
}
