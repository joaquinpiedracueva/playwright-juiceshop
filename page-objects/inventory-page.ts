import type { Locator, Page } from '@playwright/test';

export class InventoryPage {
    readonly url = '/inventory.html';
    readonly heading: Locator;
  

  constructor(page: Page) {
    this.heading = page.locator('.app_logo').filter({ hasText: 'Swag Labs' });
  }
}
