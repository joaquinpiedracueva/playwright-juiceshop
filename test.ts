import { test as base } from '@playwright/test';
import { LoginPage } from './page-objects/login-page';
import { InventoryPage } from './page-objects/inventory-page';

type PageObjects = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

export const test = base.extend<PageObjects>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
});
export { expect } from '@playwright/test';
export type { Page, Locator, TestInfo } from '@playwright/test';