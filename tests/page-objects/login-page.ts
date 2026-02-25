import type { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly url: string = '';
  readonly page: Page;
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly showPasswordButton: Locator;
  readonly loginButton: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly forgotPasswordLink: Locator;
  readonly googleLoginButton: Locator;
  readonly notYetCustomerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Login' });
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.showPasswordButton = page.getByRole('button', { name: 'Button to display the password' });
    this.loginButton = page.locator('#loginButton');
    this.rememberMeCheckbox = page.getByLabel('Checkbox to stay logged in or not logged in');
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot your password?' });
    this.googleLoginButton = page.locator('#loginButtonGoogle');
    this.notYetCustomerLink = page.getByRole('link', { name: 'Not yet a customer?' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/#/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
