import type { Locator, Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly showPasswordAdviceToggle: Locator;
  readonly securityQuestionSelect: Locator;
  readonly securityAnswerInput: Locator;
  readonly registerButton: Locator;
  readonly alreadyCustomerLink: Locator;
  readonly passwordStrengthBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'User Registration' });
    this.emailInput = page.locator('#emailControl');
    this.passwordInput = page.locator('#passwordControl');
    this.repeatPasswordInput = page.locator('#repeatPasswordControl');
    this.showPasswordAdviceToggle = page.getByRole('switch', { name: 'Show password advice' });
    this.securityQuestionSelect = page.getByLabel('Selection list for the security question');
    this.securityAnswerInput = page.locator('#securityAnswerControl');
    this.registerButton = page.locator('#registerButton');
    this.alreadyCustomerLink = page.getByRole('link', { name: 'Already a customer?' });
    this.passwordStrengthBar = page.getByRole('progressbar');
  }

  async goto(): Promise<void> {
    await this.page.goto('/#/register');
  }

  async register(email: string, password: string, securityQuestion: string, securityAnswer: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(password);
    await this.securityQuestionSelect.click();
    await this.page.getByText(securityQuestion).click();
    await this.securityAnswerInput.fill(securityAnswer);
    await this.registerButton.click();
  }
}
