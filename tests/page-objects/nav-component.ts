import type { Locator, Page } from '@playwright/test';

export class NavComponent {
  readonly page: Page;
  readonly component: Locator;
  readonly openSidenavButton: Locator;
  readonly homeButton: Locator;
  readonly searchBar: Locator;
  readonly searchInput: Locator;
  readonly accountMenuButton: Locator;
  readonly languageMenuButton: Locator;
  readonly shoppingCart: Locator;
  readonly loginMenuButton: Locator;
  readonly userProfileMenuButton: Locator;
  readonly ordersAndPaymentMenuButton: Locator;
  readonly privacyAndSecurityMenuButton: Locator;
  readonly logoutMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.component = page.locator('mat-toolbar').filter({ hasText: 'menu OWASP Juice Shop close' });
    this.openSidenavButton = page.getByRole('button', { name: 'Open Sidenav' });
    this.homeButton = page.getByRole('button', { name: 'Back to homepage' });
    this.searchBar = page.locator('#searchQuery');
    this.searchInput = page.locator('#mat-input-0');
    this.accountMenuButton = page.locator('#navbarAccount');
    this.languageMenuButton = page.getByRole('button', { name: 'Language selection menu' });
    this.shoppingCart = page.getByRole('button', { name: 'Show the shopping cart' });
    this.loginMenuButton = page.locator('#navbarLoginButton');
    this.userProfileMenuButton = page.getByRole('menuitem', { name: 'Go to user profile' });
    this.ordersAndPaymentMenuButton = page.getByRole('menuitem', { name: 'Show Orders and Payment Menu' });
    this.privacyAndSecurityMenuButton = page.getByRole('menuitem', { name: 'Show Privacy and Security Menu' });
    this.logoutMenuButton = page.getByRole('menuitem', { name: 'Logout' });
  }

  async logout(): Promise<void> {
    await this.accountMenuButton.click();
    await this.logoutMenuButton.click();
  }
}
