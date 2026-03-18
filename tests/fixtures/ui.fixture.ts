import { test as base, expect } from '@playwright/test';
import type { Page, Locator, TestInfo } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { NavPage } from '../pages/nav.page';
import { SidebarPage } from '../pages/sidebar.page';

type Fixtures = {
  axeBuilder: AxeBuilder;
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  navComponent: NavPage;
  sidebarComponent: SidebarPage;
};

export const test = base.extend<Fixtures>({
  page: async ({ page }, use) => {
    await page.goto('/');
    await use(page);
  },
  axeBuilder: async ({ page }, use) => {
    await use(new AxeBuilder({ page }));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  navComponent: async ({ page }, use) => {
    await use(new NavPage(page));
  },
  sidebarComponent: async ({ page }, use) => {
    await use(new SidebarPage(page));
  },
});

export { expect };
export type { Page, Locator, TestInfo };
