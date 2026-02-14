import { test as base } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { HomePage } from './page-objects/home-page';
import { LoginPage } from './page-objects/login-page';
import { RegisterPage } from './page-objects/register-page';
import { NavComponent } from './page-objects/nav-component';
import { SidebarComponent } from './page-objects/sidebar-component';

type Fixtures = {
  axeBuilder: AxeBuilder;
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  navComponent: NavComponent;
  sidebarComponent: SidebarComponent;
};

export const test = base.extend<Fixtures>({
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
    await use(new NavComponent(page));
  },
  sidebarComponent: async ({ page }, use) => {
    await use(new SidebarComponent(page));
  },
});

export { expect } from '@playwright/test';
export type { Page, Locator, TestInfo } from '@playwright/test';
