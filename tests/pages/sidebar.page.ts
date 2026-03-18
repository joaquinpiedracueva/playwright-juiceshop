import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class SidebarPage extends BasePage {
  readonly component: Locator;
  readonly heading: Locator;
  readonly customerFeedbackLink: Locator;
  readonly aboutUsLink: Locator;
  readonly photoWallLink: Locator;
  readonly logoutButton: Locator;
  readonly beginnersTutorialLink: Locator;
  readonly githubLink: Locator;

  constructor(page: Page) {
    super(page);
    this.component = page.locator('mat-sidenav');
    this.heading = page.getByRole('heading', { name: 'OWASP Juice Shop' });
    this.customerFeedbackLink = page.getByLabel('Go to contact us page');
    this.aboutUsLink = page.getByLabel('Go to about us page');
    this.photoWallLink = page.getByLabel('Go to photo wall');
    this.logoutButton = page.getByLabel('Logout');
    this.beginnersTutorialLink = page.getByLabel('Launch beginners tutorial');
    this.githubLink = page.getByLabel('Go to OWASP Juice Shop GitHub page');
  }
}
