import { expect } from '../fixtures';
import type { Locator, Page } from '../fixtures';

export class DynamicIdPage {
  constructor(
    private page: Page,
    private pageUrl: string = '/dynamicid',
    private pageTitle: string = 'Dynamic ID',
    private pageHeading: Locator = page.getByRole('heading', { name: 'Dynamic ID' }),
    private buttonWithDynamicId: Locator = page.getByRole('button', { name: 'Button with Dynamic ID' }),
  ) {}
  async navigate() {
    await this.page.goto(this.pageUrl);
  }
  async assertPageUrl() {
    await expect(this.page).toHaveURL(this.pageUrl);
  }
  async assertPageTitle() {
    await expect(this.page).toHaveTitle(this.pageTitle);
  }
  async assertPageHeading() {
    await expect(this.pageHeading).toBeVisible();
  }
}
